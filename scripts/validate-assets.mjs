import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import sharp from "sharp";

const ROOTS = ["src/assets", "public"];
const IMAGE_EXTENSIONS = new Set([
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
]);

const BUDGETS = [
  {
    match: /^src\/assets\/brand\//,
    label: "brand artwork",
    maxBytes: 400 * 1024,
  },
  {
    match: /^src\/assets\/environment\/background\//,
    label: "environment background",
    maxBytes: 350 * 1024,
  },
  {
    match: /^src\/assets\/environment\/(midground|foreground)\//,
    label: "environment prop",
    maxBytes: 120 * 1024,
  },
  {
    match: /^src\/assets\/characters\//,
    label: "character artwork",
    maxBytes: 300 * 1024,
  },
  {
    match: /^src\/assets\/textures\//,
    label: "texture or overlay",
    maxBytes: 60 * 1024,
  },
  {
    match: /^src\/assets\/interface\//,
    label: "interface art",
    maxBytes: 40 * 1024,
  },
  { match: /^public\/media\//, label: "media", maxBytes: 300 * 1024 },
  {
    match: /^public\/assets\/enliven-world\/branding\//,
    label: "brand artwork",
    maxBytes: 400 * 1024,
  },
  {
    match: /^public\/assets\/enliven-world\/background\//,
    label: "environment background",
    maxBytes: 350 * 1024,
  },
  {
    match: /^public\/assets\/enliven-world\/environment\//,
    label: "environment prop",
    maxBytes: 120 * 1024,
  },
  {
    match: /^public\/assets\/enliven-world\/character\//,
    label: "character artwork",
    maxBytes: 300 * 1024,
  },
  {
    match: /^public\/assets\/enliven-world\/(ui|messages)\//,
    label: "interface art",
    maxBytes: 40 * 1024,
  },
];

function findBudget(relPath) {
  return BUDGETS.find((budget) => budget.match.test(relPath));
}

function collectFiles(dir) {
  let files = [];
  let entries;

  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(collectFiles(full));
    } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }

  return files;
}

function checkSvg(filePath) {
  const content = readFileSync(filePath, "utf8");
  const hasEmbeddedRaster =
    /base64/.test(content) || /<image[\s>]/i.test(content);
  return { hasEmbeddedRaster };
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

async function main() {
  const files = ROOTS.flatMap(collectFiles);

  if (files.length === 0) {
    console.log(
      "No assets found under src/assets or public — nothing to validate yet.",
    );
    return;
  }

  let hasErrors = false;
  const warnings = [];

  for (const filePath of files) {
    const relPath = relative(process.cwd(), filePath).replace(/\\/g, "/");
    const size = statSync(filePath).size;
    const budget = findBudget(relPath);
    const ext = extname(filePath).toLowerCase();
    let note = "";

    if (ext === ".svg") {
      const { hasEmbeddedRaster } = checkSvg(filePath);
      if (hasEmbeddedRaster) {
        hasErrors = true;
        console.error(
          `ERROR  ${relPath} — SVG contains embedded raster data, not a real vector`,
        );
        continue;
      }
    } else {
      const metadata = await sharp(filePath).metadata();
      note = ` (${metadata.width}x${metadata.height} ${metadata.format})`;
    }

    if (budget && size > budget.maxBytes) {
      warnings.push(
        `${relPath}${note} — ${formatBytes(size)}, over ${budget.label} budget of ${formatBytes(budget.maxBytes)}`,
      );
    }

    console.log(`ok     ${relPath}${note} — ${formatBytes(size)}`);
  }

  if (warnings.length > 0) {
    console.log("\nBudget warnings:");
    for (const warning of warnings) {
      console.log(`WARN   ${warning}`);
    }
  }

  if (hasErrors) {
    process.exitCode = 1;
  }
}

main();

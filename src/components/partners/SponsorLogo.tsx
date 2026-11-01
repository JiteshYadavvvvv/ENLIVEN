import Image from "next/image";
import type { CSSProperties } from "react";

import type { Sponsor } from "@/content/sponsorship";

type SponsorLogoProps = {
  sponsor: Sponsor;
  sizes: string;
  index: number;
};

export default function SponsorLogo({
  sponsor,
  sizes,
  index,
}: SponsorLogoProps) {
  const logo = (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      fill
      sizes={sizes}
      unoptimized={sponsor.logo.endsWith(".svg")}
      draggable={false}
    />
  );

  return (
    <li
      className="logo-plate"
      data-surface={sponsor.surface ?? "light"}
      data-featured={sponsor.featured || undefined}
      style={{ "--j": Math.min(index, 8) } as CSSProperties}
    >
      {sponsor.url ? (
        <a
          href={sponsor.url}
          target="_blank"
          rel="noreferrer"
          title={sponsor.name}
        >
          {logo}
        </a>
      ) : (
        logo
      )}
    </li>
  );
}

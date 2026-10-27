"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const LOGO_LOCKUP_SRC =
  "/assets/enliven-world/branding/enliven-logo-lockup.webp";
const BROCHURE_PLAQUE_SRC = "/assets/enliven-world/ui/brochure-plaque.webp";

const NAV_LINKS = [
  { label: "Prizes", href: "#prizes" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Sponsor", href: "#sponsor" },
];

function BrochureButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      disabled
      title="Brochure coming soon"
      aria-label="Brochure, coming soon"
      className={`inline-flex items-center justify-center transition-transform duration-200 ease-out disabled:grayscale-[15%] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 ${className}`}
    >
      <Image
        src={BROCHURE_PLAQUE_SRC}
        alt="Brochure"
        width={304}
        height={67}
        className="h-auto w-[170px] lg:w-[195px]"
        draggable={false}
      />
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute inset-x-0 top-0 z-[var(--layer-hud)]">
      <div aria-hidden className="nav-scrim" />
      <div className="container-enliven relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="Enliven, Alive to Create.">
          <Image
            src={LOGO_LOCKUP_SRC}
            alt=""
            priority
            width={900}
            height={410}
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <ul className="col-start-2 row-start-1 hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-shadow-crisp font-display text-xl tracking-[0.06em] text-paper uppercase transition-colors duration-200 hover:text-cyan xl:text-2xl"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden justify-self-end lg:block">
          <BrochureButton />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="text-shadow-crisp col-start-3 row-start-1 justify-self-end text-paper lg:hidden"
        >
          {open ? (
            <FiX aria-hidden size={24} />
          ) : (
            <FiMenu aria-hidden size={24} />
          )}
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="container-enliven flex flex-col items-start gap-5 border-t border-border bg-void/95 py-6">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-xl tracking-[0.06em] text-paper uppercase transition-colors duration-200 hover:text-cyan"
              >
                {item.label}
              </a>
            ))}
            <BrochureButton className="mt-2" />
          </div>
        </div>
      </div>
    </nav>
  );
}

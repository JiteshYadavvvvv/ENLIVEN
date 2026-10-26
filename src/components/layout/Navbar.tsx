"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

import logo from "@/assets/brand/enliven-logo.webp";

const NAV_LINKS = [
  { label: "Prizes", href: "#prizes" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
];

function BrochureButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      disabled
      title="Brochure coming soon"
      aria-label="Brochure, coming soon"
      className={`btn btn-secondary ${className}`}
    >
      <FiDownload aria-hidden size={14} />
      Brochure
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute inset-x-0 top-0 z-[var(--layer-hud)]">
      <div className="container-enliven grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="" priority className="h-9 w-auto" />
          <span className="font-display text-xl tracking-[0.04em] text-paper uppercase">
            Enliven
          </span>
        </Link>

        <ul className="col-start-2 row-start-1 hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm tracking-[0.12em] text-paper/80 uppercase transition-colors duration-200 hover:text-cyan"
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
          className="col-start-3 row-start-1 justify-self-end text-paper lg:hidden"
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
                className="text-sm tracking-[0.12em] text-paper/80 uppercase transition-colors duration-200 hover:text-cyan"
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

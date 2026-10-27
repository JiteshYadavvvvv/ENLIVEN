"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    <Link
      href="/"
      aria-label="Brochure"
      className={`inline-flex items-center justify-center rounded-lg transition-transform duration-200 ease-out hover:scale-[1.01] active:scale-95 focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-[3px] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100 ${className}`}
    >
      <Image
        src={BROCHURE_PLAQUE_SRC}
        alt="Brochure"
        width={304}
        height={67}
        className="h-auto w-[170px] lg:w-[195px]"
        draggable={false}
      />
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the full-screen mobile menu is open, matching
  // Innerve's own NavigationBar.tsx behavior (scroll position is saved and
  // restored rather than just toggling overflow, so the page doesn't jump).
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { body } = document;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <nav className="absolute top-0 z-[var(--layer-hud)] w-full bg-transparent">
      <div aria-hidden className="nav-scrim" />
      <div className="relative flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-14">
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

        <ul className="mx-5 hidden items-center gap-4 md:flex lg:gap-[4vw]">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-shadow-gta rounded-sm font-display-gta text-xl tracking-[0.04em] text-paper uppercase transition-colors duration-200 hover:text-cyan focus-visible:text-cyan focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-4 lg:text-2xl"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <BrochureButton />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="text-shadow-crisp relative z-[var(--layer-hud)] text-paper md:hidden"
        >
          {open ? (
            <FiX aria-hidden size={28} />
          ) : (
            <FiMenu aria-hidden size={28} />
          )}
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[var(--layer-hud)] flex items-center justify-center bg-void/55 pt-20 backdrop-blur-md md:hidden"
          >
            <div className="flex w-full max-w-xs flex-col items-center gap-8 px-6">
              <ul className="flex flex-col items-center gap-6">
                {NAV_LINKS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-shadow-gta font-display-gta text-4xl tracking-[0.04em] text-paper uppercase transition-colors duration-200 hover:text-cyan"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
                className="w-full border-t border-border pt-6"
              >
                <BrochureButton className="mx-auto" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

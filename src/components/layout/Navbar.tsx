"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { FiMenu, FiX } from "react-icons/fi";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

const LOGO_LOCKUP_SRC =
  "/assets/enliven-world/branding/enliven-logo-lockup.webp";
const BROCHURE_PLAQUE_SRC = "/assets/enliven-world/ui/brochure-plaque.webp";

const NAV_LINKS = [
  { label: "Prizes", href: "#prizes" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Sponsor", href: "#sponsor" },
];

const subscribeNothing = () => () => {};

function useInBrowser() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

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

function keepFocusInside(event: KeyboardEvent<HTMLDivElement>) {
  if (event.key !== "Tab") return;
  const stops = event.currentTarget.querySelectorAll<HTMLElement>("a, button");
  const first = stops[0];
  const last = stops[stops.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function MissionMenu({ onClose }: { onClose: () => void }) {
  const still = usePrefersReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="mission-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: still ? 0 : 0.25 }}
    >
      <div
        aria-hidden
        className="mission-menu-backdrop"
        onPointerDown={onClose}
      />
      <motion.div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="mission-menu-panel"
        onKeyDown={keepFocusInside}
        initial={{ x: still ? 0 : "100%" }}
        animate={{ x: 0 }}
        exit={{ x: still ? 0 : "100%" }}
        transition={{ duration: still ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mission-menu-header">
          <Link
            href="/"
            aria-label="Enliven, Alive to Create."
            onClick={onClose}
          >
            <Image
              src={LOGO_LOCKUP_SRC}
              alt=""
              width={900}
              height={410}
              className="h-10 w-auto"
            />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="nav-icon-button"
          >
            <FiX aria-hidden size={26} />
          </button>
        </div>

        <ul className="mission-menu-links">
          {NAV_LINKS.map((item, index) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: still ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: still ? 0 : 0.12 + index * 0.06 }}
            >
              <a href={item.href} onClick={onClose}>
                <span className="mission-menu-index">0{index + 1}</span>
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mission-menu-footer">
          <BrochureButton />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const inBrowser = useInBrowser();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const menuButton = menuButtonRef.current;
    const scrollY = window.scrollY;
    const { body } = document;
    const desktop = window.matchMedia("(min-width: 48rem)");
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
      window.scrollTo(0, scrollY);
      menuButton?.focus({ preventScroll: true });
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
          ref={menuButtonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="nav-icon-button text-shadow-crisp -mr-2 md:hidden"
        >
          <FiMenu aria-hidden size={26} />
        </button>
      </div>

      {inBrowser &&
        createPortal(
          <AnimatePresence>
            {open && <MissionMenu onClose={() => setOpen(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </nav>
  );
}

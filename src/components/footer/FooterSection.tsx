"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowRight, FiArrowUp } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

import { FOOTER_CONFIG, type FooterSocialLink } from "@/content/footer";
import FooterContacts from "./FooterContacts";
import FooterVenue from "./FooterVenue";
import "./footer.css";

const LOGO_SRC = "/assets/enliven-world/branding/enliven-logo-lockup.webp";

function getSocialIcon(type: FooterSocialLink["icon"]): ReactNode {
  switch (type) {
    case "instagram":
      return <FaInstagram aria-hidden />;
    case "linkedin":
      return <FaLinkedin aria-hidden />;
    case "discord":
      return <FaDiscord aria-hidden />;
    case "twitter":
      return <FaXTwitter aria-hidden />;
    case "github":
      return <FaGithub aria-hidden />;
    case "email":
      return <MdOutlineMail aria-hidden />;
    default:
      return null;
  }
}

export default function FooterSection() {
  const {
    backgroundSrc,
    destinationKicker,
    headline,
    cityTag,
    tagline,
    venue,
    contacts,
    quickLinks,
    socials,
    credits,
  } = FOOTER_CONFIG;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="enliven-footer">
      {/* Environmental Horizon Crown Seam */}
      <div className="footer-crown" aria-hidden>
        <span className="crown-trim" />
        <span className="crown-road" />
      </div>

      {/* Atmospheric Background Layer */}
      <div className="footer-atmosphere" aria-hidden>
        {backgroundSrc ? (
          <Image
            src={backgroundSrc}
            alt="Enliven City Skyline"
            fill
            sizes="100vw"
            className="footer-bg-custom"
            priority={false}
          />
        ) : (
          <div className="footer-bg-procedural">
            <div className="sky-gradient" />
            <div className="skyline-silhouettes" />
            <div className="sky-glow" />
            <div className="sky-grid" />
          </div>
        )}
        <div className="footer-grain" />
      </div>

      <div className="footer-container">
        {/* Grand Headline Banner */}
        <div className="footer-grand-banner">
          <div className="destination-marker">
            <span className="marker-dot" aria-hidden />
            <span className="marker-text">{destinationKicker}</span>
          </div>

          <h2 id="footer-heading" className="grand-headline">
            <span className="headline-main">{headline}</span>
            <span className="headline-city">{cityTag}</span>
          </h2>

          <p className="grand-tagline">{tagline}</p>
        </div>

        {/* Core Showcase Grid: Location/GPS Map & Two Organiser Contacts */}
        <div className="footer-main-grid">
          <FooterVenue venue={venue} />
          <FooterContacts contacts={contacts} />
        </div>

        {/* Navigation & Social Matrix Bar */}
        <div className="footer-nav-hub">
          {/* Quick Navigation Links */}
          <nav
            aria-label="Footer Quick Navigation"
            className="footer-quick-nav"
          >
            <span className="nav-hub-title">DIRECT ACCESS</span>
            <ul className="quick-links-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="quick-link-item">
                    <span>{link.label}</span>
                    <FiArrowRight aria-hidden className="link-hover-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Matrix */}
          <div className="footer-social-hub">
            <span className="nav-hub-title">DISPATCH CHANNELS</span>
            <div className="social-links-list">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="social-btn"
                >
                  {getSocialIcon(social.icon)}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Final Base Bar / Copyright & Back to Top */}
        <div className="footer-base-bar">
          <div className="base-brand">
            <Image
              src={LOGO_SRC}
              alt="ENLIVEN 4"
              width={180}
              height={40}
              className="base-logo-img"
              draggable={false}
            />
            <div className="base-credits">
              <p className="credits-host">
                Organized by <strong>{credits.host}</strong> ·{" "}
                {credits.organization}
              </p>
              <p className="credits-copy">{credits.copyright}</p>
            </div>
          </div>

          <div className="base-actions">
            {credits.codeOfConductUrl && (
              <a
                href={credits.codeOfConductUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="conduct-link"
              >
                Code of Conduct
              </a>
            )}

            <button
              type="button"
              onClick={handleBackToTop}
              className="back-to-top-btn"
              aria-label="Back to top of page"
            >
              <span>TOP</span>
              <FiArrowUp aria-hidden className="top-arrow" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

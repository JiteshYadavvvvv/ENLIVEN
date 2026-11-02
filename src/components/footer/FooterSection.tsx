"use client";

import type { ReactNode } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

import { FOOTER_CONFIG, type FooterSocialLink } from "@/content/footer";
import "./footer.css";

function cleanPhone(raw: string): string {
  return raw.replace(/[^0-9+]/g, "");
}

function getSocialIcon(type: FooterSocialLink["icon"]): ReactNode {
  switch (type) {
    case "email":
      return <MdOutlineMail aria-hidden className="social-icon" />;
    case "instagram":
      return <FaInstagram aria-hidden className="social-icon" />;
    case "meta":
      return <FaMeta aria-hidden className="social-icon" />;
    case "github":
      return <FaGithub aria-hidden className="social-icon" />;
    case "linkedin":
      return <FaLinkedin aria-hidden className="social-icon" />;
    default:
      return null;
  }
}

export default function FooterSection() {
  const { background, contacts, venue, socials, credit } = FOOTER_CONFIG;

  return (
    <footer id="footer" className="enliven-footer">
      {/* 4K GTA V Sunset City Skyline Background */}
      <div className="footer-bg-layer" aria-hidden>
        <picture>
          <source media="(max-width: 767px)" srcSet={background.mobileSrc} />
          <img
            src={background.desktopSrc}
            alt=""
            className="footer-bg-img"
            loading="lazy"
          />
        </picture>
        <div className="footer-bg-scrim" />
      </div>

      {/* Main Full-Screen Center Content */}
      <div className="footer-content-wrapper">
        <div className="footer-inner-stage">
          {/* Grand Kicker / Heading */}
          <h2 id="footer-contacts-heading" className="footer-grand-heading">
            CONTACT US
          </h2>

          {/* Organiser Contacts with 3D GTA Gold Ingot Buttons */}
          <div className="footer-contacts-stage">
            {contacts.map((contact) => (
              <div key={contact.name} className="contact-person-card">
                <span className="contact-person-name">{contact.name}</span>
                <a
                  href={`tel:${cleanPhone(contact.phone)}`}
                  className="contact-gold-btn"
                  aria-label={`Call ${contact.name} at ${contact.phone}`}
                >
                  <FiPhone aria-hidden className="gold-btn-icon" />
                  <span className="gold-btn-number">{contact.phone}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Venue Section */}
          <div className="footer-venue-stage">
            <h3 className="venue-grand-heading">VENUE</h3>
            <p className="venue-address-text">{venue.name}</p>

            {/* Framed Google Maps Embed with GTA Gold Border */}
            <div className="venue-gold-map-frame">
              <iframe
                title="Army Institute of Technology, Pune Venue Map"
                src={venue.mapEmbedUrl}
                className="venue-map-iframe"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Majestic Glassmorphic Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-bar-inner">
          <p className="footer-credit-text">{credit}</p>

          <nav aria-label="Social media links" className="footer-social-row">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label={social.name}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

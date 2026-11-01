import { FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiRadio, FiUserCheck } from "react-icons/fi";
import type { ContactPerson } from "@/content/footer";

type FooterContactsProps = {
  contacts: [ContactPerson, ContactPerson];
};

function cleanPhone(raw: string): string {
  return raw.replace(/[^0-9+]/g, "");
}

export default function FooterContacts({ contacts }: FooterContactsProps) {
  return (
    <article
      className="footer-panel footer-contacts-panel"
      aria-labelledby="contacts-heading"
    >
      {/* HUD Header Bar */}
      <div className="panel-hud-bar">
        <span className="hud-badge">
          <FiRadio aria-hidden className="hud-icon animate-pulse" />
          <span>ORGANISER DISPATCH</span>
        </span>
        <span className="hud-status">
          <span className="status-dot status-dot-active" />
          <span>CHANNELS READY</span>
        </span>
      </div>

      <div className="panel-content">
        <div className="contacts-meta">
          <span className="contacts-kicker">Direct Assistance</span>
          <h3 id="contacts-heading" className="contacts-name">
            ORGANISER COMMS
          </h3>
          <p className="contacts-desc">
            Have questions about registration, rules or logistics? Connect
            directly with our lead team.
          </p>
        </div>

        {/* Two Organizer Profile Cards */}
        <div className="contacts-grid">
          {contacts.map((contact, index) => {
            const hasPhone = Boolean(
              contact.phone && contact.phone.trim().length > 0,
            );
            const isPlaceholder = contact.isPlaceholder ?? !hasPhone;
            const phoneHref = hasPhone
              ? `tel:${cleanPhone(contact.phone || "")}`
              : undefined;
            const waHref = contact.whatsapp
              ? `https://wa.me/${cleanPhone(contact.whatsapp)}`
              : hasPhone
                ? `https://wa.me/${cleanPhone(contact.phone || "")}`
                : undefined;

            return (
              <div
                key={`contact-${index * 2}`}
                className="contact-card"
                data-placeholder={isPlaceholder || undefined}
              >
                <div className="contact-card-header">
                  <span className="channel-tag">
                    {"FREQ // 0"}
                    {index + 1}
                  </span>
                  <span className="channel-signal" aria-hidden>
                    <span className="bar bar-1" />
                    <span className="bar bar-2" />
                    <span className="bar bar-3" />
                  </span>
                </div>

                <div className="contact-card-body">
                  <div className="contact-avatar-slot" aria-hidden>
                    <FiUserCheck className="avatar-icon" />
                  </div>

                  <div className="contact-details">
                    <h4 className="contact-person-name">{contact.name}</h4>
                    {contact.role && (
                      <p className="contact-person-role">{contact.role}</p>
                    )}
                  </div>
                </div>

                {/* Contact Actions or Placeholder */}
                <div className="contact-actions">
                  {isPlaceholder ? (
                    <div className="contact-placeholder-badge">
                      <span className="placeholder-tag">
                        [ COMMS ANNOUNCING SOON ]
                      </span>
                      <span className="placeholder-sub">
                        Direct phone lines activate at launch
                      </span>
                    </div>
                  ) : (
                    <div className="contact-btn-group">
                      {phoneHref && (
                        <a
                          href={phoneHref}
                          className="contact-call-btn"
                          aria-label={`Call ${contact.name} at ${contact.phone}`}
                        >
                          <FiPhone aria-hidden className="btn-call-icon" />
                          <span>{contact.phone}</span>
                        </a>
                      )}

                      {waHref && (
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-wa-btn"
                          aria-label={`Chat with ${contact.name} on WhatsApp`}
                        >
                          <FaWhatsapp aria-hidden className="btn-wa-icon" />
                          <span className="sr-only">WhatsApp</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

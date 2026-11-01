import {
  FiCompass,
  FiExternalLink,
  FiMapPin,
  FiNavigation,
} from "react-icons/fi";
import type { VenueConfig } from "@/content/footer";

type FooterVenueProps = {
  venue: VenueConfig;
};

export default function FooterVenue({ venue }: FooterVenueProps) {
  return (
    <article
      className="footer-panel footer-venue-panel"
      aria-labelledby="venue-heading"
    >
      {/* HUD Header Bar */}
      <div className="panel-hud-bar">
        <span className="hud-badge">
          <FiCompass aria-hidden className="hud-icon animate-pulse" />
          <span>{venue.coordinates}</span>
        </span>
        <span className="hud-status">
          <span className="status-dot" />
          <span>GPS LOCKED</span>
        </span>
      </div>

      <div className="panel-content">
        <div className="venue-meta">
          <span className="venue-kicker">{venue.title}</span>
          <h3 id="venue-heading" className="venue-name">
            {venue.name}
          </h3>
          <p className="venue-address">
            <span className="address-line">{venue.campus}</span>
            <span className="address-city">{venue.city}</span>
          </p>
        </div>

        {/* Map Frame */}
        <div className="venue-map-frame">
          <div className="map-hud-corner map-corner-tl" aria-hidden />
          <div className="map-hud-corner map-corner-tr" aria-hidden />
          <div className="map-hud-corner map-corner-bl" aria-hidden />
          <div className="map-hud-corner map-corner-br" aria-hidden />

          {venue.isConfigured && venue.mapEmbedUrl ? (
            <iframe
              title="Official Event Venue Map"
              src={venue.mapEmbedUrl}
              className="venue-map-iframe"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="venue-map-placeholder">
              <FiMapPin className="map-placeholder-icon" aria-hidden />
              <p className="map-placeholder-title">VENUE LOCATION PENDING</p>
              <p className="map-placeholder-desc">
                Interactive satellite navigation coordinates will unlock soon.
              </p>
            </div>
          )}

          {/* Floating GPS Target Pin Badge */}
          <div className="venue-map-overlay" aria-hidden>
            <span className="map-target-pill">
              <FiMapPin className="text-[var(--color-magenta)]" />
              <span>TERMINAL GROUNDS</span>
            </span>
          </div>
        </div>

        {/* Direct Navigation Button */}
        {venue.isConfigured && venue.directionsUrl && (
          <a
            href={venue.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="venue-directions-btn"
          >
            <FiNavigation aria-hidden className="btn-icon" />
            <span>Get Directions</span>
            <FiExternalLink aria-hidden className="btn-ext-icon" />
          </a>
        )}
      </div>
    </article>
  );
}

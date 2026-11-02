"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUp, FiVolume2, FiVolumeX } from "react-icons/fi";
import "./floating-controls.css";

const AUDIO_SRC = "/audio/enliven-ambience.mp3";
const SCROLL_THRESHOLD = 300;

export default function FloatingControls() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isTopVisible, setIsTopVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // 1. Back-To-Top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsTopVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 2. Audio Toggle handler
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasStarted) {
      setHasStarted(true);
      setIsMuted(false);
      audio.muted = false;
      audio.play().catch((err) => {
        console.warn("Audio playback notice:", err);
      });
    } else {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      audio.muted = nextMuted;

      if (!nextMuted && audio.paused) {
        audio.play().catch((err) => {
          console.warn("Audio resume notice:", err);
        });
      }
    }
  };

  return (
    <aside
      className="enliven-floating-controls"
      aria-label="Floating page controls"
    >
      {/* Hidden persistent audio element */}
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="metadata" playsInline>
        <track kind="captions" />
      </audio>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`floating-btn floating-btn-top ${
          isTopVisible ? "floating-btn-visible" : "floating-btn-hidden"
        }`}
        aria-label="Scroll back to top of page"
        title="Back to top"
        tabIndex={isTopVisible ? 0 : -1}
      >
        <FiArrowUp aria-hidden className="floating-btn-icon" />
      </button>

      {/* Audio Ambience Toggle Button */}
      <button
        type="button"
        onClick={toggleAudio}
        className={`floating-btn floating-btn-audio ${
          !isMuted ? "audio-playing" : "audio-muted"
        }`}
        aria-label={isMuted ? "Play ambience audio" : "Mute ambience audio"}
        title={isMuted ? "Play ambience" : "Mute ambience"}
      >
        {!isMuted ? (
          <>
            <FiVolume2 aria-hidden className="floating-btn-icon" />
            <span className="audio-pulse-ring" aria-hidden />
          </>
        ) : (
          <FiVolumeX aria-hidden className="floating-btn-icon" />
        )}
      </button>
    </aside>
  );
}

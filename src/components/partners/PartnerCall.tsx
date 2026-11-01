"use client";

import { useRef } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";

import { SPONSOR_CALL, SPONSOR_FORM_URL } from "@/content/sponsorship";

export default function PartnerCall({
  placement,
}: {
  placement: "billboard" | "sign";
}) {
  const noticeRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="partner-call" data-placement={placement}>
      <h3 className="partner-call-headline">{SPONSOR_CALL.headline}</h3>
      <p className="partner-call-line">{SPONSOR_CALL.line}</p>
      {SPONSOR_FORM_URL ? (
        <a
          href={SPONSOR_FORM_URL}
          target="_blank"
          rel="noreferrer"
          className="partner-call-button"
        >
          {SPONSOR_CALL.button}
          <FiArrowUpRight aria-hidden />
        </a>
      ) : (
        <>
          <button
            type="button"
            className="partner-call-button"
            aria-haspopup="dialog"
            onClick={() => noticeRef.current?.showModal()}
          >
            {SPONSOR_CALL.button}
            <FiArrowUpRight aria-hidden />
          </button>
          <dialog
            ref={noticeRef}
            className="partner-notice"
            aria-labelledby={`partner-notice-${placement}`}
            data-lenis-prevent
          >
            <form method="dialog" className="partner-notice-close">
              <button type="submit" aria-label="Close">
                <FiX aria-hidden />
              </button>
            </form>
            <h3
              id={`partner-notice-${placement}`}
              className="partner-notice-title"
            >
              {SPONSOR_CALL.pendingTitle}
            </h3>
            <p className="partner-notice-message">
              {SPONSOR_CALL.pendingMessage}
            </p>
            <form method="dialog">
              <button type="submit" className="partner-call-button">
                {SPONSOR_CALL.pendingClose}
              </button>
            </form>
          </dialog>
        </>
      )}
    </div>
  );
}

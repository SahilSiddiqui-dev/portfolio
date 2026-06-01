"use client";

import React, { useEffect } from "react";

interface HireDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HireDialog({ isOpen, onClose }: HireDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`dialog-overlay ${isOpen ? "open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-box">
        <button className="dialog-close" onClick={onClose} aria-label="Close dialog">
          ✕
        </button>
        <div className="dialog-header">
          <h2 className="dialog-title">Let&apos;s Work Together</h2>
          <div className="dialog-sub">Choose your preferred platform to hire me</div>
        </div>
        <div className="dialog-cards">
          <a
            href="https://www.fiverr.com/s/WE2rQVR"
            target="_blank"
            rel="noopener noreferrer"
            className="dialog-platform fiverr"
          >
            <div className="dp-logo" style={{ background: "rgba(29,191,115,0.15)", color: "#1dbf73", fontSize: "1.3rem", fontFamily: "'Syne',sans-serif", fontWeight: 800 }}>
              fi
            </div>
            <div className="dp-info">
              <h3 className="dp-name">Fiverr</h3>
              <p className="dp-desc">Browse gig packages, pick a plan and let&apos;s build.</p>
              <div className="dp-status">
                <span className="dp-dot" style={{ background: "#1dbf73" }}></span> Active · Responds in &lt;2 hrs
              </div>
            </div>
            <div className="dp-arrow">↗</div>
          </a>
          <a
            href="https://www.freelancer.in/u/sahilsiddiquidev?sb=t"
            target="_blank"
            rel="noopener noreferrer"
            className="dialog-platform freelancer"
          >
            <div className="dp-logo" style={{ background: "rgba(41,182,246,0.15)", color: "#29b6f6", fontSize: "1.3rem", fontFamily: "'Syne',sans-serif", fontWeight: 800 }}>
              F
            </div>
            <div className="dp-info">
              <h3 className="dp-name">Freelancer.in</h3>
              <p className="dp-desc">Milestone-based contracts, secure payments.</p>
              <div className="dp-status">
                <span className="dp-dot" style={{ background: "#29b6f6" }}></span> Active · Responds in &lt;1 hr
              </div>
            </div>
            <div className="dp-arrow">↗</div>
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

export default function Hero() {
  return (
    <section id="hero">
      <div className="wrapper">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <div className="pulse" />
              Available for freelance work
            </div>
            <h1 className="hero-title">
              Mohd Sahil<br />
              <span className="line2">Siddiqui</span><br />
              <span className="accent">Frontend &amp; </span><br />
              <span className="line2">Flutter Engineer</span><br />
            </h1>
            <p className="hero-desc">
              I design and build high-performance web interfaces and cross-platform mobile apps that deliver real business value — currently pursuing my B.Tech in Computer Science at KIET Ghaziabad (7.31 CGPA).
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                View Projects →
              </a>
              <a
                href="https://www.fiverr.com/s/WE2rQVR"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Hire Me on Fiverr
              </a>
            </div>
            <div className="hero-socials">
              <a
                href="https://github.com/sahilsiddiqui-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.16c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.06 1.82 2.79 1.29 3.47.99.1-.77.42-1.29.76-1.59-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mohd-sahil-siddiqui"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://www.fiverr.com/s/WE2rQVR"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.85c.2-.658.45-1.29.45-2.21C20.608 6.6 18.5 4.5 14.85 4.5c-3.004 0-5.25 1.71-5.987 4.18H7.196c.025-.14.05-.28.05-.43a2.3 2.3 0 0 0-2.3-2.3 2.3 2.3 0 0 0-2.3 2.3 2.3 2.3 0 0 0 2.28 2.3H5.58c-.45 1.0-.73 2.18-.73 3.38v1.48H2.22A2.22 2.22 0 0 0 0 17.63v3.37h9.87v-3.37a2.22 2.22 0 0 0-2.22-2.22H6.4v-1.48c0-.96.2-1.83.52-2.6h1.85c.62 2.08 2.42 3.49 4.75 3.49 2.7 0 4.65-1.77 4.65-4.35 0-.22-.02-.43-.05-.63h1.85c0 .2-.02.42-.02.63 0 2.56 1.92 4.35 4.5 4.35.22 0 .43-.02.63-.05v2.77h2.01v-4.12a2.22 2.22 0 0 0-2.22-2.22l.03-.03z" />
                </svg>
                Fiverr
              </a>
              <a href="/assets/resume.pdf" target="_blank" className="social-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
                  <polyline points="14 2 14 8 20 8" style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }} />
                  <line x1="12" y1="13" x2="8" y2="13" style={{ stroke: "currentColor", strokeWidth: 2 }} />
                  <line x1="12" y1="17" x2="8" y2="17" style={{ stroke: "currentColor", strokeWidth: 2 }} />
                </svg>
                Resume
              </a>
            </div>
          </div>
          <div className="hero-avatar">
            <img src="/assets/Profile.webp" alt="Sahil Siddiqui" className="profile-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

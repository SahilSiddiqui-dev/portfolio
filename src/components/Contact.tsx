"use client";

import React from "react";

export default function Contact() {
  const contacts = [
    {
      type: "email",
      label: "Email",
      value: "sahil.siddiqui.dev0@gmail.com",
      href: "mailto:sahil.siddiqui.dev0@gmail.com",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      class: "email-card",
      iconClass: "email-icon",
    },
    {
      type: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/sahilsiddiqui-dev",
      href: "https://www.linkedin.com/in/mohd-sahil-siddiqui/",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      ),
      class: "linkedin-card",
      iconClass: "linkedin-icon",
    },
    {
      type: "github",
      label: "GitHub",
      value: "github.com/sahilsiddiqui-dev",
      href: "https://github.com/sahilsiddiqui-dev",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.16c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.06 1.82 2.79 1.29 3.47.99.1-.77.42-1.29.76-1.59-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      class: "github-card",
      iconClass: "github-icon",
    },
  ];

  return (
    <section id="contact">
      <div className="wrapper">
        <p className="section-label fade-up">{"// get in touch"}</p>
        <h2 className="section-title fade-up">Contact</h2>
        <div className="divider fade-up" />
        <p className="section-sub fade-up">
          Have a project in mind? Let&apos;s talk. I&apos;m available for freelance and collaboration.
        </p>

        <div className="contact-cards fade-up">
          {contacts.map((c) => (
            <a
              key={c.type}
              href={c.href}
              target={c.type !== "email" ? "_blank" : undefined}
              rel={c.type !== "email" ? "noopener noreferrer" : undefined}
              className={`contact-card ${c.class}`}
            >
              <div className={`contact-card-icon ${c.iconClass}`}>{c.icon}</div>
              <div className="contact-card-info">
                <div className="contact-card-label">{c.label}</div>
                <div className="contact-card-value">{c.value}</div>
              </div>
              <div className="contact-card-arrow">→</div>
            </a>
          ))}
        </div>

        <div className="availability-strip fade-up">
          <div className="pulse" />
          <span>Currently available for freelance projects — typically respond within 2–4 hours (9 AM – 6 PM IST)</span>
        </div>
      </div>
    </section>
  );
}

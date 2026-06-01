"use client";

import React, { useState, useEffect } from "react";

interface NavbarProps {
  onOpenHire: () => void;
}

export default function Navbar({ onOpenHire }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // ── SCROLL SHADOW LOGIC ──
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── ACTIVE NAV LINK ON SCROLL ──
    const sections = document.querySelectorAll("section[id]");
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => spy.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((s) => spy.unobserve(s));
    };
  }, []);

  const navItems = [
    { label: "About", id: "about" },
    { label: "Education", id: "education" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        id="navbar"
        style={{
          background: isScrolled ? "rgba(10,10,15,0.95)" : "rgba(10,10,15,0.8)",
          borderBottomColor: isScrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.07)",
        }}
      >
        <a href="#hero" className="nav-logo" onClick={closeMobileMenu}>
          SS<span>.</span>
        </a>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                style={{
                  color: activeSection === item.id ? "var(--text)" : "",
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="nav-cta" onClick={onOpenHire}>
          Hire Me ✦
        </button>

        <button
          className="nav-hamburger"
          id="hamburger"
          aria-label="Menu"
          onClick={toggleMobileMenu}
        >
          <span
            style={{
              transform: isMobileMenuOpen ? "translateY(7px) rotate(45deg)" : "",
            }}
          />
          <span
            style={{
              opacity: isMobileMenuOpen ? "0" : "",
            }}
          />
          <span
            style={{
              transform: isMobileMenuOpen ? "translateY(-7px) rotate(-45deg)" : "",
            }}
          />
        </button>
      </nav>

      {/* MOBILE NAV DRAWER */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`} id="mobileDrawer">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={closeMobileMenu}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                closeMobileMenu();
                onOpenHire();
              }}
              className="btn-primary"
              style={{ border: "none", cursor: "pointer", width: "100%", justifyContent: "center" }}
            >
              Hire Me ✦
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

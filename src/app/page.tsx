"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HireDialog from "@/components/HireDialog";
import AIAssistant from "@/components/AIAssistant";

export default function Home() {
  const [isHireOpen, setIsHireOpen] = useState(false);

  useEffect(() => {
    // ── SCROLL FADE ANIMATIONS (IntersectionObserver Port) ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const parent = e.target.parentElement;
            if (parent) {
              const siblings = parent.querySelectorAll(".fade-up");
              siblings.forEach((el, idx) => {
                if (el === e.target) {
                  (el as HTMLElement).style.transitionDelay = idx * 0.07 + "s";
                }
              });
            }
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    const fadeElements = document.querySelectorAll(".fade-up");
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const openHire = () => setIsHireOpen(true);
  const closeHire = () => setIsHireOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structural layout navbar */}
      <Navbar onOpenHire={openHire} />

      {/* Main sections */}
      <main style={{ flex: 1 }}>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer credits and social */}
      <Footer />

      {/* Modals & AI Floating Widget */}
      <HireDialog isOpen={isHireOpen} onClose={closeHire} />
      <AIAssistant />
    </div>
  );
}

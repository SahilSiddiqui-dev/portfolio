"use client";

import React from "react";

export default function About() {
  const tags = [
    "Business and portfolio websites",
    "Landing pages",
    "Web applications (React/Next.js)",
    "Backend APIs with Node.js, Express, and MongoDB"
  ];
  
  const stats = [
    { number: "3rd", label: "Year CS Student" },
    { number: "2028", label: "Graduating" },
    { number: "AWS", label: "Certified" },
    { number: "2+", label: "Live Projects" },
  ];

  return (
    <section id="about">
      <div className="wrapper">
        <p className="section-label fade-up">{"// who i am"}</p>
        <h2 className="section-title fade-up">About Me</h2>
        <div className="divider fade-up" />
        <div className="about-grid">
          <div className="about-text fade-up">
            <p>
              I&apos;m Mohd Sahil, a backend developer who builds REST APIs and web applications with Node.js, Express, and MongoDB. I&apos;m a third-year B.Tech Computer Science student at KIET Group of Institutions, Ghaziabad (batch of 2028), and an AWS Certified Cloud Practitioner. I solve data structures and algorithms in C++ and care about writing clean, working code that I can explain end to end.
            </p>
            <p>
              I&apos;m looking for a backend internship, and I also take on freelance projects for individuals and small businesses.
            </p>
            <div className="about-tags mt-4">
              {tags.map((tag) => (
                <span key={tag} className="about-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="about-stats fade-up">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

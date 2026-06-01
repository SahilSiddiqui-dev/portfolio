"use client";

import React from "react";

export default function About() {
  const tags = ["⚡ Clean Code", "🎯 Detail Oriented", "📱 Cross-Platform", "🌐 Frontend Focused"];
  
  const stats = [
    { number: "2+", label: "Live Projects" },
    { number: "15+", label: "Technologies" },
    { number: "2yr", label: "CS Student" },
    { number: "2028", label: "Graduating" },
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
              I&apos;m <strong>Mohd Sahil Siddiqui</strong>, a Computer Science student in my 2nd year with a clear focus — building things for the web and cross-platform apps that look great and work even better.
            </p>
            <p>
              My stack centers around modern frontend technologies. I craft responsive landing pages, interactive UIs with React, and cross-platform mobile apps using Flutter and Dart. Every project I ship is clean, purposeful, and production-ready.
            </p>
            <p>
              I bring consistent execution, professional clean-code practices, and a sharp eye for detail. Having already built and deployed real-world applications used by real users, I focus on shipping highly reliable and optimized digital products.
            </p>
            <div className="about-tags">
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

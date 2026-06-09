"use client";

import React, { useState } from "react";

interface SkillItem {
  name: string;
  abbr: string;
  bg: string;
  color: string;
}

interface SkillGroup {
  category: string;
  items: SkillItem[];
}

function SkillCard({ name, abbr, bg, color }: SkillItem) {
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setGlowStyle({
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(124,106,255,0.08) 0%, var(--surface) 70%)`,
    });
  };

  const handleMouseLeave = () => {
    setGlowStyle({});
  };

  return (
    <div
      className="skill-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={glowStyle}
    >
      <div className="skill-icon" style={{ background: bg, color }}>
        {abbr}
      </div>
      <div className="skill-name-s">{name}</div>
    </div>
  );
}

export default function Skills() {
  const skills: SkillGroup[] = [
    {
      category: "🌐 Core Web",
      items: [
        { name: "HTML5", abbr: "H", bg: "rgba(227,79,38,0.08)", color: "#e34f26" },
        { name: "CSS3", abbr: "C", bg: "rgba(21,114,182,0.08)", color: "#1572b6" },
        { name: "JavaScript", abbr: "JS", bg: "rgba(247,223,30,0.08)", color: "#f7df1e" },
      ],
    },
    {
      category: "⚛️ Frameworks & Libraries",
      items: [
        { name: "React.js", abbr: "Re", bg: "rgba(97,218,251,0.08)", color: "#61dafb" },
        { name: "Tailwind", abbr: "Tw", bg: "rgba(56,189,248,0.08)", color: "#38bdf8" },
      ],
    },
    {
      category: "📱 Mobile & Cross-Platform",
      items: [
        { name: "Flutter", abbr: "Fl", bg: "rgba(84,197,248,0.08)", color: "#54c5f8" },
        { name: "Dart", abbr: "Da", bg: "rgba(5,83,177,0.08)", color: "#0553b1" },
        { name: "Android Studio", abbr: "As", bg: "rgba(61,220,132,0.08)", color: "#3ddc84" },
      ],
    },
    {
      category: "🔥 Backend & Deployment",
      items: [
        { name: "Firebase", abbr: "Fi", bg: "rgba(255,202,40,0.08)", color: "#ffca28" },
        { name: "Vercel", abbr: "Ve", bg: "rgba(255,255,255,0.08)", color: "#fff" },
        { name: "Netlify", abbr: "Ne", bg: "rgba(0,199,183,0.08)", color: "#00c7b7" },
      ],
    },
    {
      category: "🤖 AI & Integration",
      items: [
        { name: "AI Chatbot Development", abbr: "AI", bg: "rgba(124,106,255,0.08)", color: "#7c6aff" },
      ],
    },
    {
      category: "🛠️ Dev Tools",
      items: [
        { name: "Git", abbr: "Gi", bg: "rgba(240,80,38,0.08)", color: "#f05026" },
        { name: "GitHub", abbr: "GH", bg: "rgba(255,255,255,0.08)", color: "#ffffff" },
        { name: "Linux", abbr: "Li", bg: "rgba(252,198,36,0.08)", color: "#fcc624" },
      ],
    },
    {
      category: "💻 Languages",
      items: [
        { name: "C++", abbr: "C++", bg: "rgba(0,89,156,0.08)", color: "#00599c" },
        { name: "C", abbr: "C", bg: "rgba(168,185,204,0.08)", color: "#a8b9cc" },
        { name: "OOP", abbr: "OO", bg: "rgba(167,139,250,0.08)", color: "#a78bfa" },
      ],
    },
  ];

  return (
    <section id="skills">
      <div className="wrapper">
        <p className="section-label fade-up">{"// tech stack"}</p>
        <h2 className="section-title fade-up">Skills &amp; Tools</h2>
        <div className="divider fade-up" />
        <p className="section-sub fade-up">
          Technologies I work with regularly to build web interfaces and cross-platform applications.
        </p>

        <div className="skills-grid fade-up">
          {skills.map((group) => (
            <div key={group.category} className="skill-group">
              <div className="skill-group-label">{group.category}</div>
              <div className="skill-cards-row">
                {group.items.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

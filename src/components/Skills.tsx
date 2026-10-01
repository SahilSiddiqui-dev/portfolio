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
      category: "⚙️ Backend",
      items: [
        { name: "Node.js", abbr: "No", bg: "rgba(104,160,99,0.08)", color: "#68a063" },
        { name: "Express.js", abbr: "Ex", bg: "rgba(153,153,153,0.08)", color: "#999999" },
        { name: "MongoDB", abbr: "Mo", bg: "rgba(71,162,72,0.08)", color: "#47a248" },
        { name: "REST APIs", abbr: "API", bg: "rgba(255,255,255,0.08)", color: "#ffffff" },
        { name: "MVC", abbr: "MVC", bg: "rgba(167,139,250,0.08)", color: "#a78bfa" },
        { name: "Middleware", abbr: "Mw", bg: "rgba(97,218,251,0.08)", color: "#61dafb" },
      ],
    },
    {
      category: "💻 Languages",
      items: [
        { name: "C++ (DSA)", abbr: "C++", bg: "rgba(0,89,156,0.08)", color: "#00599c" },
        { name: "JavaScript (ES6+)", abbr: "JS", bg: "rgba(247,223,30,0.08)", color: "#f7df1e" },
        { name: "TypeScript", abbr: "TS", bg: "rgba(49,120,198,0.08)", color: "#3178c6" },
        { name: "Dart", abbr: "Da", bg: "rgba(5,83,177,0.08)", color: "#0553b1" },
      ],
    },
    {
      category: "🌐 Frontend",
      items: [
        { name: "HTML5", abbr: "H", bg: "rgba(227,79,38,0.08)", color: "#e34f26" },
        { name: "CSS3", abbr: "C", bg: "rgba(21,114,182,0.08)", color: "#1572b6" },
        { name: "React", abbr: "Re", bg: "rgba(97,218,251,0.08)", color: "#61dafb" },
        { name: "Next.js", abbr: "Nx", bg: "rgba(255,255,255,0.08)", color: "#ffffff" },
        { name: "Tailwind CSS", abbr: "Tw", bg: "rgba(56,189,248,0.08)", color: "#38bdf8" },
        { name: "Flutter", abbr: "Fl", bg: "rgba(84,197,248,0.08)", color: "#54c5f8" },
      ],
    },
    {
      category: "☁️ Cloud & Tools",
      items: [
        { name: "AWS (EC2, S3, IAM, VPC)", abbr: "AWS", bg: "rgba(255,153,0,0.08)", color: "#ff9900" },
        { name: "Linux (RHEL)", abbr: "Li", bg: "rgba(252,198,36,0.08)", color: "#fcc624" },
        { name: "Bash", abbr: "Ba", bg: "rgba(78,170,37,0.08)", color: "#4eaa25" },
        { name: "Git", abbr: "Gi", bg: "rgba(240,80,38,0.08)", color: "#f05026" },
        { name: "GitHub", abbr: "GH", bg: "rgba(255,255,255,0.08)", color: "#ffffff" },
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

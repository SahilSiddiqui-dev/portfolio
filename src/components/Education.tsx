"use client";

import React from "react";

export default function Education() {
  const timeline = [
    {
      icon: "🎓",
      badge: "Current",
      year: "2024 – 2028",
      title: "B.Tech — Computer Science",
      institution: "KIET Group of Institutions, Ghaziabad",
      gradeType: "CGPA",
      gradeValue: "7.31",
      note: "Specializing in web technologies, cross-platform development and software engineering fundamentals.",
      current: true,
    },
    {
      icon: "📚",
      year: "2022 – 2023",
      title: "12th Standard — PCM",
      institution: "Golden Flower Public School",
      gradeType: "Score",
      gradeValue: "82%",
      note: "Science stream with Mathematics and Computer Science as core subjects.",
    },
    {
      icon: "📖",
      year: "2020 – 2021",
      title: "10th Standard",
      institution: "Delhi Public School",
      gradeType: "Score",
      gradeValue: "81%",
      note: "Strong academic foundation with distinction in Mathematics and Science.",
    },
  ];

  return (
    <section id="education">
      <div className="wrapper">
        <p className="section-label fade-up">{"// academic path"}</p>
        <h2 className="section-title fade-up">Education</h2>
        <div className="divider fade-up" />

        <div className="edu-timeline">
          {timeline.map((item, index) => (
            <div key={index} className="edu-item fade-up">
              <div className="edu-icon">{item.icon}</div>
              <div className="edu-connector" />
              <div className="edu-card">
                {item.current && <div className="edu-badge current">{item.badge}</div>}
                <div className="edu-year">{item.year}</div>
                <h3 className="edu-title">{item.title}</h3>
                <div className="edu-institution">{item.institution}</div>
                <div className="edu-grade">
                  <span className="grade-label">{item.gradeType}</span>
                  <span className="grade-value">{item.gradeValue}</span>
                </div>
                <p className="edu-note">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

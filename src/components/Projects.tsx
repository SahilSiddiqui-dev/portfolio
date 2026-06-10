"use client";

import React, { useState } from "react";

interface Project {
  featured: boolean;
  tag: { type: string; label: string };
  title: string;
  desc: string;
  stack: string[];
  demo: string | null;
  github: string | null;
  preview: string | null;
}

const PROJECTS: Project[] = [
  {
    featured: true,
    tag: { type: "live", label: "✦ Live Project" },
    title: "CityBite — Food SaaS",
    desc: "A premium multi-tenant food ordering platform for local restaurants. Features interactive dark-themed storefronts, customizable menu add-ons, and a streamlined mobile-first checkout workflow.",
    stack: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    demo: "https://restaurent-three-ashen.vercel.app/",
    github: "https://github.com/SahilSiddiqui-dev/CityBite",
    preview: "/assets/restaurent.png",
  },
  {
    featured: true,
    tag: { type: "live", label: "✦ Live Project" },
    title: "Sundarban Adventure",
    desc: "A professional web presence for a local tour guide — showcasing services, collecting bookings, and displaying testimonials. Smooth animations, clean layout, mobile-first design.",
    stack: ["HTML", "CSS", "JavaScript", "Animations"],
    demo: "https://sahilsiddiqui-dev.github.io/Sundarban-Adventure",
    github: "https://github.com/SahilSiddiqui-dev/Sundarban-Adventure",
    preview: "/assets/sundarban-adventure.webp",
  },
  {
    featured: true,
    tag: { type: "college", label: "🏫 College Project" },
    title: "Community Notice Board",
    desc: "A web app for colony residents to view announcements, post buy/sell/rent listings, and track local events — all stored in localStorage.",
    stack: ["HTML", "CSS", "JavaScript", "localStorage"],
    demo: "https://sahilsiddiqui-dev.github.io/Community-Notice-board-Website/",
    github: "https://github.com/SahilSiddiqui-dev/Community-Notice-board-Website",
    preview: "/assets/community.webp",
  },
  {
    featured: true,
    tag: { type: "live", label: "✦ Live Project" },
    title: "School Official Website",
    desc: "A responsive school website that centralizes all essential details and enables online inquiries, saving time for both families and staff.",
    stack: ["React", "TailwindCSS", "Firebase"],
    demo: "https://akash-school-demo.vercel.app/",
    github: "https://github.com/SahilSiddiqui-dev/School_Demo",
    preview: "/assets/school.webp",
  },
  {
    featured: true,
    tag: { type: "wip", label: "✦ Active Project" },
    title: "Stride — A Todo App",
    desc: "A Todo app built with Flutter and Dart, with smooth slide animations and local storage persistence. Targeting both Android and future iOS builds.",
    stack: ["Flutter", "Dart", "Firebase", "Android Studio"],
    demo: null,
    github: "https://github.com/SahilSiddiqui-dev/Stride-A_Todo_App",
    preview: "/assets/mobile.webp",
  },
];

const GH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "4px" }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.16c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.06 1.82 2.79 1.29 3.47.99.1-.77.42-1.29.76-1.59-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrapper">
        <p className="section-label fade-up">{"// what i've built"}</p>
        <h2 className="section-title fade-up">Projects</h2>
        <div className="divider fade-up" />
        <p className="section-sub fade-up">Real projects, deployed and live — built to solve real problems.</p>
        <div className="projects-grid" id="projectsGrid">
          {PROJECTS.map((project) => (
            <div key={project.title} className="project-wrapper">
              <ProjectCardInner project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── AUXILIARY INNER COMPONENT FOR CARDS ──
function ProjectCardInner({ project }: { project: Project }) {
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTransformStyle(`translateY(-5px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  const renderMockup = (p: Project) => {
    const inner = p.preview ? (
      <img
        src={p.preview}
        alt={`${p.title} preview`}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
        loading="lazy"
      />
    ) : (
      <div className="mockup-content">
        <div className="mockup-hero" />
        <div className="mockup-rows">
          <div className="mockup-row wide" />
          <div className="mockup-row medium" />
          <div className="mockup-row short" />
        </div>
      </div>
    );

    return (
      <div className="project-mockup">
        <div className="mockup-bar">
          <span />
          <span />
          <span />
        </div>
        {inner}
      </div>
    );
  };

  const renderFeaturedMockup = (p: Project) => {
    if (!p.preview) {
      return (
        <div className="project-mockup featured-mockup" style={{ margin: 0, border: "none", borderRadius: 0, height: "100%", width: "100%" }}>
          <div className="mockup-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="mockup-content">
            <div className="mockup-hero" />
            <div className="mockup-rows">
              <div className="mockup-row wide" />
              <div className="mockup-row medium" />
              <div className="mockup-row short" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <img
        src={p.preview}
        alt={`${p.title} preview`}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
        className="featured-project-image"
        loading="lazy"
      />
    );
  };

  if (project.featured) {
    return (
      <div
        className="project-card featured fade-up"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: transformStyle }}
      >
        <div className="featured-image">{renderFeaturedMockup(project)}</div>
        <div className="featured-content">
          <div className="featured-label">Featured Project</div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.desc}</p>
          <div className="project-stack">
            {project.stack.map((s) => (
              <span key={s} className="stack-badge">
                {s}
              </span>
            ))}
          </div>
          <div className="project-links">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-btn link-live"
              >
                ↗ Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn link-github">
                {GH_ICON} {project.demo ? "GitHub" : "View on GitHub"}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="project-card fade-up"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {renderMockup(project)}
      <div className="project-meta">
        <span className={`project-tag tag-${project.tag.type}`}>{project.tag.label}</span>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-stack">
        {project.stack.map((s) => (
          <span key={s} className="stack-badge">
            {s}
          </span>
        ))}
      </div>
      <div className="project-links">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn link-live"
          >
            ↗ Live Demo
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn link-github">
            {GH_ICON} {project.demo ? "GitHub" : "View on GitHub"}
          </a>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="wrapper">
      <footer>
        <span>© {currentYear} Mohd Sahil Siddiqui · Recreated with React &amp; Next.js</span>
        <div className="footer-links">
          <a href="https://github.com/sahilsiddiqui-dev" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/mohd-sahil-siddiqui/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://www.fiverr.com/s/WE2rQVR" target="_blank" rel="noopener noreferrer">
            Fiverr
          </a>
        </div>
      </footer>
    </div>
  );
}

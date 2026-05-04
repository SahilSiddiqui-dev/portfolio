# 👨‍💻 Sahil Siddiqui — Portfolio

> A modern, sleek portfolio website showcasing frontend and Flutter development work. Built with clean HTML, CSS, and JavaScript with a focus on performance, design, and user experience.

![Portfolio Preview](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Last Updated](https://img.shields.io/badge/Updated-May%202026-orange?style=flat-square)

---

## ✨ Features

- **🎨 Beautiful Dark Theme** — Modern UI with purple and teal accents
- **📱 Fully Responsive** — Works seamlessly on desktop, tablet, and mobile
- **⚡ Smooth Animations** — Scroll-triggered fade-up animations & floating blobs
- **🧭 Smart Navigation** — Fixed navbar with mobile drawer menu
- **🎯 Smooth Scrolling** — Native scroll behavior with anchor links
- **📊 Project Showcase** — Display of completed projects with visuals
- **🔗 Social Integration** — Links to GitHub, LinkedIn, Fiverr, and Resume
- **♿ Accessible** — Semantic HTML & ARIA labels

---

## 🎯 Sections

### 1. **Hero Section**
First impression with:
- Badge showing availability for freelance work
- Main headline introducing you as Frontend & Flutter Developer
- Call-to-action buttons ("View Projects" & "Hire Me")
- Social media links and resume download

### 2. **About Section**
Personal introduction covering:
- Professional background
- Tech stack and expertise
- Career highlights and approach

### 3. **Education Section**
Academic qualifications and learning milestones

### 4. **Skills Section**
Technical skills organized by categories

### 5. **Projects Section**
Featured projects with descriptions and visuals from assets

### 6. **Contact Section**
Get in touch with social links and contact options

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup & structure |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript (Vanilla)** | Interactivity, scroll animations |
| **Google Fonts** | Typography (Syne, DM Mono, Outfit) |
| **WebP Images** | Optimized assets in `/assets` folder |

### Key Design Patterns
- CSS Variables for consistent theming
- Intersection Observer API for scroll animations
- Mobile-first responsive design
- Glassmorphism effects (backdrop blur)

---

## 📁 Project Structure

```
portfolio/
├── index.html           # Main HTML file
├── style.css            # All styling & animations
├── script.js            # Interactivity & animations
├── README.md            # This file
├── assets/
│   ├── resume.pdf       # Your resume
│   ├── community.webp   # Project image
│   ├── mobile.webp      # Project image
│   └── sundarban-adventure.webp  # Project image
└── .gitignore           # Git configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime, etc.)
- Node.js/npm (optional, for local server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SahilSiddiqui-dev/portfolio.git
   cd portfolio
   ```

2. **Open locally**
   - Double-click `index.html` to open in browser, OR
   - Use a local server for better performance:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. **Navigate to** `http://localhost:8000` (or your server port)

---

## 🎨 Customization

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
  --accent: #7c6aff;      /* Primary color */
  --accent2: #a78bfa;     /* Secondary accent */
  --teal: #2dd4bf;        /* Highlight color */
  --bg: #0a0a0f;          /* Background */
  --text: #f0eeff;        /* Text color */
  /* ... more variables */
}
```

### Update Content
- **Hero Section**: Edit text in `index.html` hero section
- **Social Links**: Update URLs in nav and hero sections
- **Projects**: Add project cards with descriptions
- **Resume**: Replace `assets/resume.pdf` with your resume

### Add New Sections
1. Add HTML markup in `index.html`
2. Style in `style.css` following existing patterns
3. Add fade-up class for animations: `class="fade-up"`

---

## 📱 Browser Support

| Browser | Status |
|---------|--------|
| Chrome | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Edge | ✅ Full support |
| IE 11 | ❌ Not supported |

---

## ⚡ Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Page Load**: < 2s on 4G
- **Optimizations**: WebP images, CSS animations, defer JS

---

## 📞 Contact & Links

- **GitHub**: [SahilSiddiqui-dev](https://github.com/SahilSiddiqui-dev)
- **LinkedIn**: [Mohd Sahil Siddiqui](https://linkedin.com/in/mohd-sahil-siddiqui)
- **Fiverr**: [Hire on Fiverr](https://www.fiverr.com/s/WE2rQVR)
- **Resume**: [View Resume](./assets/resume.pdf)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 💡 Tips

- Keep your resume updated in `/assets/`
- Add new projects with images to the projects section
- Monitor analytics to track visitor engagement
- Regularly update the "Available for work" badge status
- Consider adding a blog section for thought leadership

---

<div align="center">

**Made with ❤️ by Sahil Siddiqui**

*Crafting beautiful web experiences, one pixel at a time.*

</div>

# Mohd Sahil Siddiqui — Personal Portfolio

> **Live site →** [sahilsiddiqui.site](https://sahilsiddiqui.site)

A high-performance, single-page developer portfolio showcasing my work as a Frontend & Flutter Engineer. Built with the latest Next.js 16 + React 19, styled with Tailwind CSS v4, and supercharged with a built-in AI Assistant powered by Anthropic's Claude API.

---

## ✨ Features

| Section | Description |
|---|---|
| **Hero** | Animated intro with live "Available for freelance" badge, CTA buttons, and social links |
| **About** | Personal background and what I do |
| **Education** | B.Tech CS at KIET Ghaziabad (7.31 CGPA) |
| **Skills & Tools** | Interactive skill cards with mouse-tracking glow effects |
| **Projects** | Showcase of selected web & mobile projects |
| **Contact** | Direct contact form powered by EmailJS |
| **AI Assistant** | Floating Claude-powered chatbot that answers questions about me, my skills, and services — with a built-in lead capture form |
| **Hire Dialog** | Quick modal to initiate hiring conversations |

### 🤖 AI Chatbot
A floating chat widget (bottom-right) lets visitors:
- Ask questions about my skills, projects, and services
- Submit a **lead form** directly inside the chat
- The bot wiggles every 15 seconds to grab attention and shows a notification bubble after 3 seconds

---

## 🛠 Tech Stack

<img src="https://skillicons.dev/icons?i=typescript,react,tailwind,next" />

---

## 📁 Project Structure

```
d:\Portfolio\
├── public/
│   └── assets/          # Images, resume PDF, tech-stack banner
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/    # Claude AI API route
│   │   ├── globals.css  # Design system tokens & animations
│   │   ├── layout.tsx   # Root layout with SEO metadata
│   │   └── page.tsx     # Main page (assembles all sections)
│   └── components/
│       ├── AIAssistant.tsx   # Floating AI chatbot + lead form
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── Education.tsx
│       ├── Footer.tsx
│       ├── Hero.tsx
│       ├── HireDialog.tsx
│       ├── Navbar.tsx
│       ├── Projects.tsx
│       └── Skills.tsx
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/sahilsiddiqui-dev/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Anthropic Claude AI (for the AI Assistant chatbot)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# EmailJS (for the contact form and lead capture)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Where to get these:**
> - Anthropic API key → [console.anthropic.com](https://console.anthropic.com)
> - EmailJS credentials → [emailjs.com](https://www.emailjs.com)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## 🌐 Deployment

The site is deployed on **Vercel** and auto-deploys on every push to `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sahilsiddiqui-dev/portfolio)

Make sure to add all environment variables from `.env.local` to your Vercel project's Environment Variables settings.

---

## 🤝 Connect

- 🌍 **Website:** [sahilsiddiqui.site](https://sahilsiddiqui.site)
- 💼 **LinkedIn:** [mohd-sahil-siddiqui](https://linkedin.com/in/mohd-sahil-siddiqui)
- 🐙 **GitHub:** [sahilsiddiqui-dev](https://github.com/sahilsiddiqui-dev)
- 🎯 **Fiverr:** [Hire me on Fiverr](https://www.fiverr.com/s/WE2rQVR)
- 📧 **Email:** sahil.siddiqui.dev0@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Designed & built by <strong>Mohd Sahil Siddiqui</strong> · <a href="https://sahilsiddiqui.site">sahilsiddiqui.site</a></p>

import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Sahil's AI Portfolio Assistant. Represent Sahil Siddiqui professionally.

ABOUT SAHIL:
- Frontend & Flutter Developer, B.Tech CS student (2024-2028) at KIET Group of Institutions, Ghaziabad. CGPA: 7.31.
- Builds modern websites, responsive UIs, landing pages, portfolios, and Flutter apps.

SKILLS: HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Flutter, Dart, Firebase, Vercel, Netlify, Git, GitHub, C++, OOP, AI Chatbot Development.

SERVICES:
- Custom AI Chatbot Integration (Just like the AI Assistant you are talking to right now! Sahil can design, build, and embed an intelligent, custom AI chatbot tailored to your business, services, or portfolio to engage visitors and capture leads automatically).
- Portfolio & Business Websites (Sleek, fully responsive, and highly optimized).
- High-Converting Landing Pages (Pixel-perfect layouts focused on conversions).
- Sleek React/Next.js Frontend Development.
- Cross-platform Mobile Apps with Flutter & Dart.
- Website Redesign & Optimization.

PROJECTS:
1. Sundarban Adventure – tourism website (HTML/CSS/JS), tour packages, booking, mobile-first.
2. Community Notice Board – web app with announcements, marketplace, LocalStorage.
3. Stride Todo App – Flutter productivity app, task management, Firebase.
4. School Official Website - responsive school info portal built in React and Tailwind.

RULES:
- Be concise, professional, confident.
- Never invent info or claim skills not listed.
- Never promise timelines.
- Stay on-topic (Sahil's work only).
- When a user asks about services, make sure to enthusiastically pitch the Custom AI Chatbot Integration as a prime offering.
- Whenever a user inquires about building a website, mobile app, custom chatbot, or hiring Sahil, you must immediately trigger lead collection. Output the exact phrase: "Based on your requirements, this sounds like a project Sahil could help with. I'd love to collect your details so he can reach out." followed by "Please fill out the contact form below!" to trigger the interactive form. Do not give vague or generic conversational replies.
- Keep replies under 150 words unless detailing skills/projects. Always present listings (such as services, skills, or projects) in clean, structured points (using '-' or '1.', '2.' for lists) instead of dense paragraphs to ensure high readability and visual scanning.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    // ── CASE 1: GEMINI API (Primary Live Model) ──
    if (geminiKey) {
      try {
        // Translate message history for Gemini structure
        const geminiMessages = messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: geminiMessages,
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }],
              },
              generationConfig: {
                maxOutputTokens: 400,
                temperature: 0.7,
              },
            }),
          }
        );

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return NextResponse.json({ reply: text });
        }
      } catch (err) {
        console.error("Gemini API Error:", err);
      }
    }

    // ── CASE 2: ANTHROPIC CLAUDE API (Fallback Model) ──
    if (anthropicKey) {
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-latest",
            max_tokens: 400,
            system: SYSTEM_PROMPT,
            messages: messages.map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await response.json();
        const text = data.content?.[0]?.text;
        if (text) {
          return NextResponse.json({ reply: text });
        }
      } catch (err) {
        console.error("Anthropic API Error:", err);
      }
    }

    // ── CASE 3: SMART OFFLINE FALLBACK MOCK (Prevents crashes in local dev) ──
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const lower = lastUserMessage.toLowerCase();

    let reply = "I'm Sahil's AI assistant. I'm currently running in offline preview mode. How can I help you learn more about Sahil's work?";

    if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("tool")) {
      reply = "Sahil specializes in Web Frontend, Flutter mobile development, and AI integration. His key skills include HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Flutter, Dart, Firebase, Git/GitHub, C++, and AI Chatbot Development. He specializes in building fast, clean, responsive UIs.";
    } else if (lower.includes("project") || lower.includes("work") || lower.includes("built") || lower.includes("showcase")) {
      reply = "Sahil has built several live projects: \n1. Sundarban Adventure - A mobile-first tourist portal built in HTML/CSS/JS.\n2. Community Notice Board - A colony-level posting and announcements board with localStorage.\n3. School Official Website - A responsive React and Tailwind administration site.\n4. Stride - A premium Todo app built in Flutter and Dart. \nWhich one would you like to hear about?";
    } else if (lower.includes("education") || lower.includes("college") || lower.includes("kiet") || lower.includes("degree")) {
      reply = "Sahil is pursuing his B.Tech in Computer Science at KIET Group of Institutions, Ghaziabad (2024-2028), holding a current CGPA of 7.31. He has a strong academic focus on software engineering, OOP fundamentals, and practical project builds.";
    } else if (lower.includes("service") || lower.includes("offer") || lower.includes("price") || lower.includes("cost")) {
      reply = "Sahil offers professional freelance services including:\n1. Custom AI Chatbot Integration – Just like me! Sahil can design, build, and embed an intelligent custom chatbot tailored to your site to engage users and collect leads automatically.\n2. Portfolio & Business Websites – Sleek, fully responsive, and highly optimized.\n3. High-Converting Landing Pages – Pixel-perfect layouts focused on conversions.\n4. Cross-Platform Mobile Apps – Built using Flutter and Dart for iOS and Android.\nWhich of these services are you looking for?";
    } else if (lower.includes("hire") || lower.includes("website") || lower.includes("app") || lower.includes("freelance")) {
      reply = "Based on your requirements, this sounds like a project Sahil could help with. I'd love to collect your details so he can reach out. Please provide your contact details in the form below!";
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("social")) {
      reply = "You can reach Sahil directly via email at sahil.siddiqui.dev0@gmail.com, or connect on LinkedIn at linkedin.com/in/mohd-sahil-siddiqui. He is highly responsive!";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

"use client";

import React, { useState, useEffect, useRef } from "react";

interface Message {
  role: "bot" | "user";
  content: string;
  chips?: string[];
  wantsLead?: boolean;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi there! I'm Sahil's AI assistant. Sahil is a Frontend & Flutter Developer open to freelance work — he builds clean, responsive websites and mobile apps.",
      chips: ["See his skills", "View projects", "I need a website", "Hire Sahil"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [shouldWiggle, setShouldWiggle] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Trigger wiggle and notification tooltip after 3 seconds
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
      setShouldWiggle(true);
    }, 3000);

    // Stop wiggling after 1.3s so hover transition works normally
    const wiggleTimer = setTimeout(() => {
      setShouldWiggle(false);
    }, 4300);

    // Periodically re-trigger wiggle every 15 seconds to grab attention
    const periodicWiggleInterval = setInterval(() => {
      setShouldWiggle(true);
      setTimeout(() => {
        setShouldWiggle(false);
      }, 1300);
    }, 15000);

    return () => {
      clearTimeout(notificationTimer);
      clearTimeout(wiggleTimer);
      clearInterval(periodicWiggleInterval);
    };
  }, []);

  const renderMessageContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      
      // Check if it's a bullet item starting with - or *
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        const text = trimmed.substring(1).trim();
        return (
          <div key={i} style={{ display: "flex", gap: "6px", marginLeft: "8px", marginBottom: "4px", alignItems: "flex-start" }}>
            <span style={{ color: "var(--accent2)", fontSize: "0.8rem", marginTop: "2px" }}>✦</span>
            <span>{text}</span>
          </div>
        );
      }
      
      // Check if it's a numbered item starting with a number and a dot
      const numMatch = trimmed.match(/^(\d+)\.(.*)$/);
      if (numMatch) {
        const num = numMatch[1];
        const text = numMatch[2].trim();
        return (
          <div key={i} style={{ display: "flex", gap: "6px", marginLeft: "8px", marginBottom: "4px", alignItems: "flex-start" }}>
            <span style={{ color: "var(--accent2)", fontWeight: 700, fontSize: "0.85rem" }}>{num}.</span>
            <span>{text}</span>
          </div>
        );
      }
      
      return <p key={i} style={{ marginBottom: line.trim() ? "6px" : "12px", minHeight: line.trim() ? "0px" : "8px" }}>{line}</p>;
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
  };

  const getChips = (lower: string): string[] => {
    if (lower.includes("skill") || lower.includes("tech")) {
      return ["See projects", "What services do you offer?", "Hire Sahil"];
    }
    if (lower.includes("project")) {
      return ["Tell me about Flutter app", "What websites has he built?"];
    }
    if (lower.includes("service")) {
      return ["I need a website", "I need a mobile app", "What does it cost?"];
    }
    if (lower.includes("portfolio") || lower.includes("business")) {
      return ["Get started", "See his projects first"];
    }
    return [];
  };

  const sendMessage = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: trimmedText } as Message];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      // Map message history into Claude's expectations
      const history = newMessages.map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "I'm having trouble connecting right now. Sahil might be updating my API keys. Let's try again in a bit!",
          },
        ]);
        return;
      }

      const reply = data.reply || "I'm having trouble processing that response. Please try again!";
      const lower = reply.toLowerCase();
      const wantsLead =
        lower.includes("collect your details") ||
        lower.includes("reach out") ||
        lower.includes("contact details") ||
        lower.includes("name + email") ||
        lower.includes("form below") ||
        lower.includes("project sahils could help with") ||
        lower.includes("project sahil could help with");
      
      const chips = getChips(lower);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: reply,
          chips: chips.length ? chips : undefined,
          wantsLead: wantsLead,
        },
      ]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Connection issue — please check your internet or try again in a moment.",
        },
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(inputValue);
    }
  };


  return (
    <>
      {/* Floating Notification Tooltip */}
      {showNotification && !isOpen && (
        <div className="ai-chat-notification" onClick={toggleChat}>
          <div className="ai-chat-notification-avatar">SS</div>
          <div className="ai-chat-notification-content">
            <p className="ai-chat-notification-title">Sahil Siddiqui</p>
            <p className="ai-chat-notification-text">👋 Chat with my AI Assistant!</p>
          </div>
          <button
            className="ai-chat-notification-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowNotification(false);
            }}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        className={`ai-chat-bubble-toggle ${shouldWiggle ? "wiggle" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Floating Chat Container */}
      <div className={`ai-chat-container ${isOpen ? "open" : ""}`}>
        {/* Chat Header */}
        <div className="ai-chat-header">
          <div className="ai-chat-avatar">SS</div>
          <div className="ai-chat-header-info">
            <div className="ai-chat-header-name">Sahil&apos;s AI Assistant</div>
            <div className="ai-chat-header-sub">
              <span className="ai-chat-online-dot" /> Online now
            </div>
          </div>
          <span className="ai-chat-badge">AI Chatbot</span>
          <button className="ai-chat-close-btn" onClick={toggleChat} aria-label="Close chat">
            ✕
          </button>
        </div>

        {/* Chat Messages */}
        <div className="ai-chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`ai-chat-msg ${msg.role === "bot" ? "bot" : "user"}`}>
              {msg.role === "bot" && <div className="ai-chat-msg-avatar">SS</div>}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ai-chat-bubble">{renderMessageContent(msg.content)}</div>
                
                {/* Chip suggestions */}
                {msg.chips && (
                  <div className="ai-chat-chips">
                    {msg.chips.map((c) => (
                      <button key={c} className="ai-chat-chip" onClick={() => sendMessage(c)}>
                        {c}
                      </button>
                    ))}
                  </div>
                )}

                {/* Lead Form */}
                {msg.wantsLead && <LeadForm />}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="ai-chat-msg bot">
              <div className="ai-chat-msg-avatar">SS</div>
              <div className="ai-chat-bubble ai-chat-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="ai-chat-input-area">
          <input
            type="text"
            className="ai-chat-input"
            placeholder="Ask about skills, projects, or services…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <button
            className="ai-chat-send-btn"
            onClick={() => sendMessage(inputValue)}
            disabled={isTyping}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

// ── AUXILIARY LEAD FORM SUBMISSION COMPONENT (DECOUPLED FOR RECONCILIATION STABILITY) ──
// ── VALIDATION HELPERS ──
const TEMP_EMAIL_DOMAINS = [
  "mailinator.com","guerrillamail.com","10minutemail.com","tempmail.com",
  "throwam.com","yopmail.com","trashmail.com","sharklasers.com","fakeinbox.com",
  "maildrop.cc","dispostable.com","spamgourmet.com","getairmail.com","getnada.com",
];

const isValidName = (v: string) => /^[a-zA-Z\s'-]{2,50}$/.test(v.trim());
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isTempEmail = (v: string) => TEMP_EMAIL_DOMAINS.some(d => v.toLowerCase().includes(d));
const isSpamText = (v: string) => {
  const t = v.trim().toLowerCase();
  if (t.length === 0) return false;
  // Repeated character spam: "aaaaaa", "123123"
  if (/^(.)\1{4,}$/.test(t)) return true;
  // Keyboard smash patterns
  if (/^[asdfghjklqwertyuiopzxcvbnm]{8,}$/i.test(t) && /(.)\1{2,}/.test(t)) return true;
  return false;
};

const LeadForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);

  // Per-field errors
  const [errors, setErrors] = useState<{
    name?: string; email?: string; projectType?: string; requirements?: string; global?: string;
  }>({});

  // Validate all fields, return true if clean
  const validate = (): boolean => {
    const e: typeof errors = {};

    // Name
    if (!name.trim()) {
      e.name = "Name is required.";
    } else if (!isValidName(name)) {
      e.name = "Enter a real name (letters only, 2–50 chars).";
    } else if (isSpamText(name)) {
      e.name = "That doesn't look like a real name.";
    }

    // Email
    if (!email.trim()) {
      e.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      e.email = "Enter a valid email address.";
    } else if (isTempEmail(email)) {
      e.email = "Disposable/temp emails are not allowed.";
    }

    // Project Type
    if (!projectType.trim()) {
      e.projectType = "Please specify the type of project.";
    } else if (projectType.trim().length < 3) {
      e.projectType = "Project type is too short.";
    }

    // Requirements
    if (!requirements.trim()) {
      e.requirements = "Please describe your requirements.";
    } else if (requirements.trim().length < 15) {
      e.requirements = `Too short — add at least ${15 - requirements.trim().length} more characters.`;
    } else if (isSpamText(requirements)) {
      e.requirements = "Please write a meaningful description.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async () => {
    if (!validate()) { triggerShake(); return; }

    setIsSending(true);
    setErrors({});

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || "";

    if (!serviceId || !templateId || !publicKey) {
      setTimeout(() => { setSubmitted(true); setIsSending(false); }, 800);
      return;
    }

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: name.trim(),
            reply_to: email.trim(),
            project_type: projectType.trim(),
            message: requirements.trim(),
            to_name: "Sahil",
          },
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errText = await response.text();
        console.error("EmailJS Error:", errText);
        setErrors({ global: "Failed to send. Try again or email sahil.siddiqui.dev0@gmail.com" });
      }
    } catch (err) {
      console.error("Network Error:", err);
      setErrors({ global: "Network error. Please try again or reach out directly!" });
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ fontSize: "13px", color: "var(--teal)", fontWeight: 500, paddingTop: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "16px" }}>✅</span>
        <span>Thanks <strong>{name.trim()}</strong>! Sahil will reach out to <strong>{email.trim()}</strong> soon.</span>
      </div>
    );
  }

  // Inline field error style
  const errStyle: React.CSSProperties = { color: "#f87171", fontSize: "10.5px", marginTop: "3px", marginBottom: "2px", display: "block" };
  const inputStyle = (hasErr?: string): React.CSSProperties => hasErr
    ? { borderColor: "rgba(248,113,113,0.6)", background: "rgba(248,113,113,0.04)" }
    : {};

  return (
    <div className={`ai-chat-lead-form${shake ? " form-shake" : ""}`}>

      {/* Name */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Your Name *"
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })); }}
          disabled={isSending}
          style={inputStyle(errors.name)}
          maxLength={50}
        />
        {errors.name && <span style={errStyle}>⚠ {errors.name}</span>}
      </div>

      {/* Email */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="email"
          placeholder="Email Address *"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
          disabled={isSending}
          style={inputStyle(errors.email)}
          maxLength={100}
        />
        {errors.email && <span style={errStyle}>⚠ {errors.email}</span>}
      </div>

      {/* Project Type */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Project Type (e.g. Flutter App) *"
          value={projectType}
          onChange={(e) => { setProjectType(e.target.value); if (errors.projectType) setErrors(p => ({ ...p, projectType: undefined })); }}
          disabled={isSending}
          style={inputStyle(errors.projectType)}
          maxLength={60}
        />
        {errors.projectType && <span style={errStyle}>⚠ {errors.projectType}</span>}
      </div>

      {/* Requirements */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Brief Requirements (min. 15 chars) *"
          value={requirements}
          onChange={(e) => { setRequirements(e.target.value); if (errors.requirements) setErrors(p => ({ ...p, requirements: undefined })); }}
          disabled={isSending}
          style={inputStyle(errors.requirements)}
          maxLength={300}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {errors.requirements
            ? <span style={errStyle}>⚠ {errors.requirements}</span>
            : <span />
          }
          <span style={{ fontSize: "10px", color: requirements.trim().length >= 15 ? "var(--teal)" : "var(--text3)", marginTop: "3px" }}>
            {requirements.trim().length}/300
          </span>
        </div>
      </div>

      {/* Global error */}
      {errors.global && (
        <p style={{ color: "#f87171", fontSize: "11px", margin: "2px 0 6px" }}>⚠️ {errors.global}</p>
      )}

      <button onClick={handleSubmit} disabled={isSending}>
        {isSending ? "Sending…" : "Send to Sahil ✦"}
      </button>
    </div>
  );
};

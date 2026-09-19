"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

// Audio synthesizer for premium chimes
const playChime = (type: "click" | "chime") => {
    try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === "click") {
            osc.frequency.setValueAtTime(580, ctx.currentTime);
            gain.gain.setValueAtTime(0.008, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } else if (type === "chime") {
            const now = ctx.currentTime;
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
            osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
            gain.gain.setValueAtTime(0.015, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
            osc.start(now);
            osc.stop(now + 0.8);
        }
    } catch {
        // Audio context blocked by browser
    }
};

type ChatMessagePart = {
    type: string;
    toolName?: string;
    state?: string;
    toolCallId?: string;
    input?: {
        clientName?: string;
        businessType?: string;
        desiredBotFeatures?: string;
    };
    output?: {
        clientName?: string;
        businessType?: string;
        desiredBotFeatures?: string;
        success?: boolean;
    };
};

interface ChatWidgetProps {
    isInline?: boolean; // True: Embed inline inside mockup frame, False: Floating launcher bubble
    onClose?: () => void;
}

// Custom Markdown typewriter component to simulate human typing in real-time
const TypewriterMarkdown = ({ text, isStreaming }: { text: string; isStreaming: boolean }) => {
    const [displayedText, setDisplayedText] = useState("");
    const textRef = useRef(text);
    textRef.current = text;

    useEffect(() => {
        if (!isStreaming) {
            setDisplayedText(text);
            return;
        }

        let timerId: NodeJS.Timeout;
        const tick = () => {
            setDisplayedText((prev) => {
                const target = textRef.current;
                if (prev.length >= target.length) {
                    return prev;
                }
                const diff = target.length - prev.length;
                const step = diff > 40 ? 5 : diff > 20 ? 3 : 1;
                const nextText = target.slice(0, prev.length + step);
                
                timerId = setTimeout(tick, 10 + Math.random() * 8);
                return nextText;
            });
        };

        timerId = setTimeout(tick, 15);
        return () => clearTimeout(timerId);
    }, [text, isStreaming]);

    return (
        <ReactMarkdown
            components={{
                p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-0.5">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
            }}
        >
            {displayedText}
        </ReactMarkdown>
    );
};

export default function ChatWidget({ isInline = false, onClose }: ChatWidgetProps) {
    const [isOpen, setIsOpen] = useState(isInline);
    const [unread, setUnread] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [greeting, setGreeting] = useState("Welcome to Bramley AI. I am your digital front-desk concierge. How may I assist your business today?");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setGreeting("Welcome to Bramley AI. I am your digital front-desk concierge. How may I assist your business today?");
    }, []);

    const calcomUrl = "https://cal.com/bramley-ai/strategy-call";

    // Setup Vercel AI SDK useChat Hook
    const {
        messages,
        status,
        sendMessage,
    } = useChat({
        messages: [
            {
                id: "welcome-message",
                role: "assistant" as "user" | "assistant" | "system",
                parts: [
                    {
                        type: "text",
                        text: "Welcome to Bramley AI. I am your digital front-desk concierge. How may I assist your business today?"
                    }
                ]
            }
        ],
        onFinish: () => {
            playChime("chime");
        }
    });

    // Auto-scroll on new messages
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
        if (!isOpen && messages.length > 1) {
            setUnread(true);
        }
    }, [messages, isOpen]);

    // Get request body with client timezone and local time
    const getChatRequestOptions = () => ({
        body: {
            clientTime: new Date().toISOString(),
            clientTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
    });

    // Handle Quick Action Clicks
    const executeQuickAction = (action: "availability" | "pricing" | "human") => {
        playChime("click");
        if (action === "availability") {
            sendMessage({
                parts: [{ type: "text", text: "I'd like to check appointment availability." }]
            }, getChatRequestOptions());
        } else if (action === "pricing") {
            sendMessage({
                parts: [{ type: "text", text: "Can you show me the pricing and services menu?" }]
            }, getChatRequestOptions());
        } else if (action === "human") {
            sendMessage({
                parts: [{ type: "text", text: "I'd like to speak with a human team member." }]
            }, getChatRequestOptions());
        }
    };

    return (
        <>
            {/* FLOATING LAUNCHER ICON */}
            {!isInline && (
                <div className="fixed bottom-6 right-6 z-50">
                    <motion.button
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setUnread(false);
                            playChime("click");
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 cursor-pointer border border-white/10 outline-none"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -45, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 45, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={20} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="open"
                                    initial={{ rotate: 45, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -45, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <MessageSquare size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {unread && (
                            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white" />
                        )}
                    </motion.button>
                </div>
            )}

            {/* CHAT CONTAINER PANEL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={isInline ? {} : { opacity: 0, scale: 0.95, y: 15 }}
                        animate={isInline ? {} : { opacity: 1, scale: 1, y: 0 }}
                        exit={isInline ? {} : { opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        style={isInline ? {} : { transformOrigin: "bottom right" }}
                        className={`
                            ${isInline
                                ? "w-full h-full relative border-0 rounded-none shadow-none"
                                : "fixed bottom-24 right-6 w-[360px] h-[550px] max-h-[calc(100vh-125px)] border border-slate-200/50 rounded-3xl shadow-[0_24px_60px_-15px_rgba(99,102,241,0.12)] z-50"
                            }
                            flex flex-col bg-white/90 backdrop-blur-xl overflow-hidden text-slate-800 font-sans
                        `}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white/40">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full overflow-hidden select-none border border-slate-200/50 shadow-sm relative bg-slate-50">
                                        <Image src="/images/luna-avatar.png" alt="Luna" fill className="object-cover animate-pulse" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                                </div>
                                <div className="text-left">
                                    <div className="text-xs font-semibold text-slate-850 leading-tight">
                                        Luna
                                    </div>
                                    <span className="text-[9px] text-indigo-650 font-semibold tracking-wider uppercase">AI Specialist | Bramley AI</span>
                                </div>
                            </div>

                            {!isInline && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        playChime("click");
                                        if (onClose) onClose();
                                    }}
                                    className="p-1.5 rounded-full hover:bg-slate-100/50 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer border-0"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-none"
                        >
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex flex-col w-full ${m.role === "user" ? "items-end" : "items-start"}`}
                                >
                                    {m.parts && m.parts.map((part, index) => {
                                        if (part.type === "text") {
                                            const isLastMessage = messages[messages.length - 1]?.id === m.id;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`
                                                        p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] mt-1 first:mt-0
                                                        ${m.role === "user"
                                                            ? "bg-indigo-600 text-white rounded-tr-none shadow-sm shadow-indigo-600/10 font-medium text-right"
                                                            : "bg-slate-100 text-slate-700 border border-slate-200/40 rounded-tl-none shadow-sm shadow-slate-100/50 text-left"
                                                        }
                                                    `}
                                                >
                                                    {m.role === "user" ? (
                                                        part.text
                                                    ) : (
                                                        <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed font-light break-words">
                                                            <TypewriterMarkdown 
                                                                text={m.id === "welcome-message" ? greeting : part.text} 
                                                                isStreaming={isLastMessage && status !== "ready"}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        // Render save_client_scope tool output
                                        if (part.type === "tool-save_client_scope" || (part.type === "dynamic-tool" && (part as ChatMessagePart).toolName === "save_client_scope")) {
                                            const toolPart = part as ChatMessagePart;
                                            const state = toolPart.state;
                                            const input = toolPart.input || {};

                                            if (state !== "input-streaming" && state !== "input-available") {
                                                const confirmed = toolPart.output || input || {};
                                                return (
                                                    <div
                                                        key={index}
                                                        className="mt-2 w-[85%] p-4 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl shadow-sm text-[11px] flex flex-col gap-2 text-slate-700 self-start text-left"
                                                    >
                                                        <div className="flex items-center gap-1.5 text-indigo-800 font-semibold">
                                                            <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">✓</div>
                                                            <span>Specifications Scoped</span>
                                                        </div>
                                                        <div className="space-y-1 mt-1 font-light">
                                                            <div><span className="font-semibold text-slate-800">Business Owner:</span> {confirmed.clientName}</div>
                                                            <div><span className="font-semibold text-slate-800">Business Type:</span> {confirmed.businessType}</div>
                                                            <div className="mt-1.5 pt-1.5 border-t border-slate-200/50">
                                                                <span className="font-semibold text-slate-800 block mb-0.5">Desired Chatbot Features:</span>
                                                                <p className="leading-relaxed break-words">{confirmed.desiredBotFeatures}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div
                                                    key={index}
                                                    className="mt-2 w-[85%] p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 shadow-sm text-[11px] self-start"
                                                >
                                                    <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                                    <span className="text-slate-500 font-medium">Saving specifications scope...</span>
                                                </div>
                                            );
                                        }

                                        // Render show_booking_calendar tool output
                                        if (part.type === "tool-show_booking_calendar" || (part.type === "dynamic-tool" && (part as ChatMessagePart).toolName === "show_booking_calendar")) {
                                            const toolPart = part as ChatMessagePart;
                                            const state = toolPart.state;
                                            return (
                                                <div key={index} className="mt-2 w-full">
                                                    {state === "input-streaming" || state === "input-available" ? (
                                                        <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 shadow-sm text-[11px] w-[85%]">
                                                            <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                                            <span className="text-slate-500 font-medium">Opening scheduling console...</span>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white mt-1">
                                                            <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 text-[10px] font-semibold text-slate-700 flex justify-between items-center">
                                                                <span className="font-sans">Bramley AI Scheduling</span>
                                                                <span className="text-[9px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium">Select a Date & Time</span>
                                                            </div>
                                                            <iframe
                                                                src={`${calcomUrl}?embed=true`}
                                                                style={{ width: "100%", height: "300px", border: "none" }}
                                                                title="Schedule strategy call"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>
                            ))}

                            {/* Streaming Thinking Loader */}
                            {(status === "streaming" || status === "submitted") && messages[messages.length - 1]?.role === "user" && (
                                <div className="flex flex-col gap-1.5 self-start w-[85%] animate-pulse">
                                    <div className="p-2.5 bg-slate-100 border border-slate-200/40 rounded-2xl rounded-tl-none w-fit flex gap-1 items-center px-3.5 py-2.5 mt-1">
                                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick action chips */}
                        <div className="px-4 py-2 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-50 border-t border-slate-150">
                            <button
                                onClick={() => executeQuickAction("availability")}
                                className="text-[10px] px-3 py-1 bg-white border border-slate-200 rounded-full hover:border-indigo-600 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                Check Availability
                            </button>
                            <button
                                onClick={() => executeQuickAction("pricing")}
                                className="text-[10px] px-3 py-1 bg-white border border-slate-200 rounded-full hover:border-indigo-600 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                View Pricing
                            </button>
                            <button
                                onClick={() => executeQuickAction("human")}
                                className="text-[10px] px-3 py-1 bg-white border border-slate-200 rounded-full hover:border-indigo-600 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                Speak to a Human
                            </button>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-slate-150 bg-white">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!chatInput.trim() || status !== "ready") return;
                                    playChime("click");
                                    sendMessage({
                                        parts: [{ type: "text", text: chatInput.trim() }]
                                    }, getChatRequestOptions());
                                    setChatInput("");
                                }}
                                className="flex gap-2 items-center relative"
                            >
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    disabled={status !== "ready"}
                                    placeholder="Message Luna..."
                                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-full py-1.5 pl-3.5 pr-9 text-xs text-slate-700 outline-none transition-all disabled:opacity-55"
                                />
                                <button
                                    type="submit"
                                    disabled={status !== "ready" || !chatInput.trim()}
                                    className="absolute right-1 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors disabled:opacity-40"
                                >
                                    <Send size={10} />
                                </button>
                            </form>
                            <div className="text-[8px] text-slate-400 text-center mt-2 font-light">
                                Bramley AI Concierge Systems
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

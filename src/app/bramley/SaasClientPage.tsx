"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { 
    Check, 
    Sparkles, 
    ArrowRight, 
    ChevronRight, 
    AlertCircle, 
    UserCheck, 
    Code, 
    Sliders,
    ShieldCheck,
    Lock,
    ShieldAlert,
    Smartphone
} from "lucide-react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("src/components/ChatWidget"), {
    ssr: false,
});
const ContactModal = dynamic(() => import("src/components/ContactModal"), {
    ssr: false,
});
const TermsModal = dynamic(() => import("src/components/TermsModal"), {
    ssr: false,
});

export default function Home() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    // Smooth scroll helper
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Custom Cubic Bezier easing curve for premium, high-end feel
    const cubicEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

    const { scrollY, scrollYProgress } = useScroll();

    // Scroll progress bar spring
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Timeline scroll path tracking
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: timelineScrollY } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });
    const scaleLineY = useSpring(timelineScrollY, {
        stiffness: 80,
        damping: 20
    });

    // Track scroll height to update sticky header visual state
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }
    });

    // Background parallax translation depths
    const yBg1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const yBg2 = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const yBg3 = useTransform(scrollYProgress, [0, 1], [0, -180]);

    // Hero phone parallax translation
    const yPhone = useTransform(scrollYProgress, [0, 0.3], [0, -45]);

    // Scroll reveal variants
    const containerStagger = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05
            }
        }
    };

    const childFadeUp = {
        hidden: { opacity: 0, y: 35, scale: 0.97 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 18,
                mass: 0.8
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500/10 selection:text-indigo-600 relative overflow-x-hidden">
            {/* Page Scroll Progress Indicator */}
            <motion.div 
                style={{ scaleX }} 
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-[0%] z-50 shadow-[0_1px_8px_rgba(99,102,241,0.3)]" 
            />

            {/* Ambient Background Glow Particles (Parallax) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div 
                    style={{ y: yBg1 }} 
                    className="absolute top-[10%] -right-[5%] w-[380px] h-[380px] bg-indigo-500/5 rounded-full blur-[120px]" 
                />
                <motion.div 
                    style={{ y: yBg2 }} 
                    className="absolute top-[35%] -left-[5%] w-[420px] h-[420px] bg-purple-500/5 rounded-full blur-[140px]" 
                />
                <motion.div 
                    style={{ y: yBg3 }} 
                    className="absolute top-[68%] -right-[5%] w-[480px] h-[480px] bg-pink-500/5 rounded-full blur-[150px]" 
                />
            </div>
            
            {/* Sticky Navigation Header */}
            <header className={`sticky top-0 z-40 transition-all duration-300 ${
                hasScrolled 
                    ? "bg-slate-50/90 backdrop-blur-md border-b border-slate-200/50 shadow-sm" 
                    : "bg-slate-50/0 border-b border-transparent"
            }`}>
                <div className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
                    hasScrolled ? "h-16" : "h-20"
                }`}>
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-sans font-bold text-sm select-none shadow-md shadow-indigo-600/10">
                            B
                        </span>
                        <span className="font-sans text-base font-bold tracking-tight text-slate-900">
                            Bramley <span className="text-indigo-600 font-medium">AI</span>
                        </span>
                    </div>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <button onClick={() => scrollToSection("features")} className="hover:text-indigo-600 transition-colors cursor-pointer border-0 bg-transparent">Benefits</button>
                        <button onClick={() => scrollToSection("workflow")} className="hover:text-indigo-600 transition-colors cursor-pointer border-0 bg-transparent">How It Works</button>
                        <button onClick={() => scrollToSection("case-studies")} className="hover:text-indigo-600 transition-colors cursor-pointer border-0 bg-transparent">Blueprints</button>
                    </div>

                    {/* Header CTA */}
                    <div>
                        <button
                            id="header-cta"
                            onClick={() => setIsContactOpen(true)}
                            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
                        >
                            Request Prototype
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                
                {/* 1. Hero Section (Above the Fold) */}
                <section className="max-w-6xl mx-auto px-6 pt-8 pb-16 md:pt-16 md:pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        {/* Left: Headline & Single low-friction CTA */}
                        <motion.div 
                            variants={containerStagger}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-7 flex flex-col items-start text-left"
                        >
                            <motion.span variants={childFadeUp} className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-indigo-600 tracking-wider bg-indigo-50 px-3.5 py-1.5 rounded-full mb-6">
                                <Sparkles size={12} className="animate-pulse" /> Bramley Concierge AI
                            </motion.span>
                            
                            <motion.h1 variants={childFadeUp} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight">
                                Your Digital Front Desk. <br />
                                Always Active. <br />
                                Always Booked.
                            </motion.h1>
                            
                            <motion.p variants={childFadeUp} className="text-base sm:text-lg text-slate-500 font-light mt-5 max-w-lg leading-relaxed">
                                A bespoke 24/7 AI concierge custom-trained on your menu, pricing, and booking parameters. Setup, polished, and active on your website in 48 hours.
                            </motion.p>
                            
                            {/* Single Dominant Low-Friction CTA */}
                            <motion.div variants={childFadeUp} className="mt-8 flex flex-col items-stretch sm:items-start gap-3.5 w-full">
                                <button
                                    id="hero-primary-cta"
                                    onClick={() => setIsContactOpen(true)}
                                    className="group flex items-center justify-center gap-2 px-8 py-4.5 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-650/20 transition-all duration-300 cursor-pointer w-full sm:w-auto text-center"
                                >
                                    <span>Request Free Prototype</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                
                                {/* Quick Trust Badges below CTA */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-slate-400 font-medium mt-3.5 border-t border-slate-200/60 pt-3.5 w-full sm:w-auto">
                                    <span className="flex items-center gap-1">
                                        <Lock size={10} className="text-slate-400" /> GDPR & HIPAA Ready
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="flex items-center gap-1">
                                        <ShieldCheck size={11} className="text-slate-400" /> Bank-Grade Encryption
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="flex items-center gap-1">
                                        <Check size={11} className="text-indigo-500" /> Prototype in 48 hrs
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right: Live Interactive Mobile Sandbox Mockup (Show, Don't Tell) */}
                        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end relative">
                            {/* Decorative ambient halo behind the phone */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
                            
                            <motion.div
                                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, ease: cubicEasing, delay: 0.15 }}
                                className="relative z-10 w-full max-w-[310px] sm:max-w-[330px]"
                            >
                                <motion.div style={{ y: yPhone }} className="w-full">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            ease: "easeInOut"
                                        }}
                                        className="w-full"
                                    >
                                    {/* Mobile Phone Device Shell */}
                                    <div className="w-full aspect-[9/16] rounded-[42px] border-[8px] border-slate-800 bg-slate-900 shadow-[0_24px_50px_-15px_rgba(99,102,241,0.18)] overflow-hidden flex flex-col relative">
                                        {/* Island Notch */}
                                        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-30 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute right-4" />
                                        </div>

                                        {/* Screen view rendering ChatWidget */}
                                        <div className="w-full h-full pt-6 bg-slate-50 overflow-hidden flex flex-col">
                                            <ChatWidget isInline={true} />
                                        </div>
                                    </div>

                                    <div className="mt-4 text-[10px] text-slate-400 font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 bg-white border border-slate-200/50 px-4 py-2 rounded-full shadow-sm">
                                        <Sparkles size={11} className="text-indigo-600 animate-pulse" />
                                        <span>Try saying: &quot;Hi, I run a clinic&quot;</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

                {/* 2. Grayscale Trust Logo Ticker */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: cubicEasing }}
                    className="bg-slate-100/50 border-y border-slate-200/40 py-10"
                >
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans md:text-left text-center">
                                Trusted by local business owners at
                            </span>
                            
                            {/* grayscaled client logo indicators */}
                            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
                                <span className="font-serif text-sm font-bold tracking-tight text-slate-900 uppercase">Apex Dental</span>
                                <span className="font-sans text-sm font-semibold tracking-wider text-slate-900 uppercase">Bloom Salon</span>
                                <span className="font-serif text-sm italic font-medium tracking-tight text-slate-900">Elite Auto Care</span>
                                <span className="font-sans text-sm font-black tracking-tighter text-slate-900">BELLA BISTRO</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 3. The "Problem" Section (Empathetic Pain Scoping) */}
                <section id="problem" className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: cubicEasing }}
                            className="text-center max-w-2xl mx-auto mb-12"
                        >
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-red-500 tracking-wider bg-red-50 px-3 py-1 rounded-full">
                                <AlertCircle size={11} /> The Leak in Your Business
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
                                You Are Too Busy Working to Answer Every Call.
                            </h2>
                            <p className="text-sm text-slate-400 mt-2 font-light">
                                In local business, a missed call is almost always a missed sale.
                            </p>
                        </motion.div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-12">
                            <motion.div 
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: cubicEasing }}
                                whileHover={{ y: -5, scale: 1.01, border: "1px solid rgba(99, 102, 241, 0.15)", boxShadow: "0 15px 35px -10px rgba(99, 102, 241, 0.05)" }}
                                className="bg-slate-50 border border-slate-200/50 p-8 rounded-2xl flex flex-col justify-between transition-all duration-300"
                            >
                                <div className="space-y-4">
                                    <h4 className="text-lg font-bold text-slate-900">The Friction Point:</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                                        You are too busy cutting hair, treating patients, or running a kitchen to answer every single website message. 
                                    </p>
                                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                                        But customers expect immediate responses. When a visitor hits your site at <strong className="font-medium text-slate-700">11 PM</strong> and can&apos;t get a quick answer to pricing or availability, they don&apos;t wait. <strong className="font-medium text-slate-900">They click back and book with your competitor.</strong>
                                    </p>
                                </div>
                                <div className="text-xs font-semibold text-slate-400 mt-6 pt-4 border-t border-slate-200/50">
                                    Daily lost revenue from missed inquiries
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: cubicEasing, delay: 0.15 }}
                                whileHover={{ y: -5, scale: 1.01, boxShadow: "0 15px 35px -10px rgba(99, 102, 241, 0.2)" }}
                                className="bg-indigo-950 text-indigo-100 p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300"
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                                
                                <div className="space-y-4 relative z-10">
                                    <h4 className="text-lg font-bold text-white">The Bramley Strategy:</h4>
                                    <p className="text-xs text-indigo-300 leading-relaxed font-light">
                                        Your Bramley AI concierge operates 24/7. It fields inbound inquiries, qualifies leads, structures guest preferences, and routes booked slots straight to your gateway.
                                    </p>
                                    <p className="text-xs text-indigo-300 leading-relaxed font-light">
                                        Ensure your business never misses another high-value lead, even when your staff is occupied or offline.
                                    </p>
                                </div>
                                <div className="text-xs font-semibold text-indigo-400 mt-6 pt-4 border-t border-indigo-900/50 relative z-10">
                                    24/7 automated booking and revenue recovery
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 4. Bento Grid Layout (Information Architecture) */}
                <section id="features" className="py-20 bg-slate-100/50 border-t border-slate-200/40">
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: cubicEasing }}
                            className="text-center max-w-2xl mx-auto mb-16"
                        >
                            <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider bg-indigo-50 px-3.5 py-1.5 rounded-full">
                                Built For Conversion
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-5">
                                Elite Operations. Zero Friction.
                            </h2>
                            <p className="text-sm text-slate-400 mt-2 font-light">
                                A premium digital concierge engineered for absolute safety and enterprise-grade reliability.
                            </p>
                        </motion.div>

                        {/* Bento Grid Container */}
                        <motion.div 
                            variants={containerStagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]"
                        >
                                                     {/* Bento Item 1: Control (Spans 2 columns on desktop) */}
                            <motion.div 
                                variants={childFadeUp}
                                whileHover={{ y: -6, scale: 1.01, border: "1px solid rgba(99, 102, 241, 0.2)", boxShadow: "0 15px 35px -10px rgba(99, 102, 241, 0.08)" }}
                                className="md:col-span-2 row-span-1 bg-white border border-slate-200/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Sliders size={18} />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-base font-bold text-slate-900">Stay in total control</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed font-light mt-1 max-w-md">
                                        Only approve the appointments you want. When customers inquire, the AI qualifies them and queues the slot. You review the details and confirm with one click.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bento Item 2: Zero Tech Skills */}
                            <motion.div 
                                variants={childFadeUp}
                                whileHover={{ y: -6, scale: 1.01, border: "1px solid rgba(99, 102, 241, 0.2)", boxShadow: "0 15px 35px -10px rgba(99, 102, 241, 0.08)" }}
                                className="bg-white border border-slate-200/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <UserCheck size={18} />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-base font-bold text-slate-900">Zero tech skills required</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed font-light mt-1">
                                        We handle 100% of the build, write greeting rules, feed services catalogs, and configure calendar endpoints.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bento Item 3: 10-Minute Install */}
                            <motion.div 
                                variants={childFadeUp}
                                whileHover={{ y: -6, scale: 1.01, border: "1px solid rgba(99, 102, 241, 0.2)", boxShadow: "0 15px 35px -10px rgba(99, 102, 241, 0.08)" }}
                                className="bg-white border border-slate-200/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Code size={18} />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-base font-bold text-slate-900">10-minute site installation</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed font-light mt-1">
                                        Just paste one small code snippet. Works with WordPress, Squarespace, Wix, Shopify, or custom HTML.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bento Item 4: Zero-Hallucination Guarantee (Spans 2 columns on desktop) */}
                            <motion.div 
                                variants={childFadeUp}
                                whileHover={{ y: -6, scale: 1.01, boxShadow: "0 15px 35px -10px rgba(99,102,241,0.25)" }}
                                className="md:col-span-2 row-span-1 bg-indigo-900 text-white rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
                            >
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center z-10">
                                    <ShieldAlert size={18} />
                                </div>
                                <div className="mt-4 z-10 text-left">
                                    <h3 className="text-base font-bold text-white">Bramley Safety Guardrail</h3>
                                    <p className="text-xs text-indigo-200 leading-relaxed font-light mt-1 max-w-lg">
                                        Engineered with strict Retrieval-Augmented Generation (RAG) constraints. The concierge is mathematically restricted from inventing details, ensuring it only quotes your verified pricing, schedule rules, and business guidelines.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bento Item 5: SMS Escalation */}
                            <motion.div 
                                variants={childFadeUp}
                                whileHover={{ y: -6, scale: 1.01, border: "1px solid rgba(99, 102, 241, 0.2)", boxShadow: "0 15px 35px -10px rgba(99, 102, 241, 0.08)" }}
                                className="bg-white border border-slate-200/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Smartphone size={18} />
                                </div>
                                <div className="mt-4 text-left">
                                    <h3 className="text-base font-bold text-slate-900">SMS Escalation Fail-Safe</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed font-light mt-1">
                                        If a caller requests human intervention or asks a highly complex custom query, the Bramley concierge immediately alerts your staff via SMS.
                                    </p>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>
                </section>

                {/* 5. How It Works Workflow (timeline - Enterprise-Grade reliability focus) */}
                <section id="workflow" className="py-20 bg-white border-t border-slate-250/20">
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: cubicEasing }}
                            className="text-center max-w-xl mx-auto mb-16"
                        >
                            <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
                                Workflow
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mt-4">
                                Enterprise-Grade Answering System
                            </h2>
                            <p className="text-xs text-slate-400 mt-2 font-light">
                                A robust, secure, and professional gateway designed to protect client data and calendar integrity.
                            </p>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div 
                            ref={timelineRef}
                            variants={containerStagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative ml-4 md:ml-32 space-y-12"
                        >
                            {/* Background path line */}
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200/80" />
                            
                            {/* Active path line */}
                            <motion.div 
                                style={{ scaleY: scaleLineY }} 
                                className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-600 origin-top" 
                            />

                            {/* Step 1 */}
                            <motion.div variants={childFadeUp} className="relative pl-8 md:pl-12">
                                <motion.span 
                                    variants={{
                                        hidden: { scale: 0.6, opacity: 0 },
                                        visible: { 
                                            scale: 1, 
                                            opacity: 1,
                                            transition: { type: "spring", stiffness: 200, damping: 15 }
                                        }
                                    }}
                                    className="absolute -left-[14px] top-1.5 w-7 h-7 rounded-full bg-indigo-50 border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                                >
                                    01
                                </motion.span>
                                <div className="text-left">
                                    <h3 className="text-base font-bold text-slate-900">Secure Edge Ingestion & Contextual Scoping</h3>
                                    <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed max-w-xl">
                                        The Bramley concierge securely intercepts inbound website inquiries. Using your custom encrypted database guidelines, it scopes treatment preferences, answers service menu queries, and compiles guest contact profiles (Name, Email, preferred window).
                                    </p>
                                </div>
                            </motion.div>

                            {/* Step 2 */}
                            <motion.div variants={childFadeUp} className="relative pl-8 md:pl-12">
                                <motion.span 
                                    variants={{
                                        hidden: { scale: 0.6, opacity: 0 },
                                        visible: { 
                                            scale: 1, 
                                            opacity: 1,
                                            transition: { type: "spring", stiffness: 200, damping: 15 }
                                        }
                                    }}
                                    className="absolute -left-[14px] top-1.5 w-7 h-7 rounded-full bg-indigo-50 border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                                >
                                    02
                                </motion.span>
                                <div className="text-left">
                                    <h3 className="text-base font-bold text-slate-900">Instant Request Validation (Secure Payload)</h3>
                                    <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed max-w-xl">
                                        The scoped guest preferences are compiled into a secure request payload and instantly transmitted to your admin dashboard and notification queue. The AI operates in a sandbox—it has zero direct write access to your underlying CRM or scheduling software.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Step 3 */}
                            <motion.div variants={childFadeUp} className="relative pl-8 md:pl-12">
                                <motion.span 
                                    variants={{
                                        hidden: { scale: 0.6, opacity: 0 },
                                        visible: { 
                                            scale: 1, 
                                            opacity: 1,
                                            transition: { type: "spring", stiffness: 200, damping: 15 }
                                        }
                                    }}
                                    className="absolute -left-[14px] top-1.5 w-7 h-7 rounded-full bg-indigo-50 border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                                >
                                    03
                                </motion.span>
                                <div className="text-left">
                                    <h3 className="text-base font-bold text-slate-900">Human-in-the-Loop Gateway Control</h3>
                                    <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed max-w-xl">
                                        You remain the ultimate gatekeeper of your schedule. Simply review the booking details and click &quot;Approve&quot;. The system automatically logs the event, updates your calendars, and dispatches a verified email confirmation to the client.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* 6. Industry Blueprints (Challenge -> Solution -> ROI format) */}
                <section id="case-studies" className="bg-slate-100/50 border-y border-slate-200/40 py-20">
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: cubicEasing }}
                            className="text-center max-w-xl mx-auto mb-16"
                        >
                            <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider bg-indigo-50 px-3.5 py-1.5 rounded-full">
                                Industry Blueprints
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mt-4">
                                Tailored Solutions for Local Niches
                            </h2>
                            <p className="text-xs text-slate-500 mt-2 font-light">
                                See how our AI agents are custom-engineered to solve specific operational friction points and capture missed revenue.
                            </p>
                        </motion.div>

                        <motion.div 
                            variants={containerStagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
                        >
                            {/* Blueprint 1 */}
                            <motion.div 
                                variants={childFadeUp}
                                whileHover={{ y: -6, scale: 1.01, border: "1px solid rgba(99, 102, 241, 0.2)", boxShadow: "0 15px 35px -10px rgba(99, 102, 241, 0.08)" }}
                                className="bg-white border border-slate-200/50 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300"
                            >
                                <div className="space-y-4 text-left">
                                    <h4 className="text-sm font-bold text-slate-900">Apex Dental Blueprint</h4>
                                    
                                    <div className="space-y-2.5 text-xs text-slate-500 font-light leading-relaxed">
                                        <div>
                                            <strong className="font-semibold text-slate-800 block">Industry Problem:</strong>
                                            Apex Dental was receiving 35% of website visits after 6 PM, leading to missed emergency dental inquiries and lost bookings to 24/7 clinics.
                                        </div>
                                        <div>
                                            <strong className="font-semibold text-slate-800 block">AI Strategy:</strong>
                                            Deploy the Bramley AI concierge to scope after-hours emergency inquiries and queue request payloads.
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-100 text-left">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-600 block mb-1">Target Outcome</span>
                                    <div className="text-base font-extrabold text-slate-900 leading-tight">Capture Emergency Bookings</div>
                                    <span className="text-[10px] text-slate-400 font-medium font-sans">Projected outcome: +$3,850/mo pipeline</span>
                                </div>
                            </motion.div>

                            {/* Blueprint 2 */}
                            <motion.div 
                                variants={childFadeUp}
                                whileHover={{ y: -6, scale: 1.01, border: "1px solid rgba(99, 102, 241, 0.2)", boxShadow: "0 15px 35px -10px rgba(99, 102, 241, 0.08)" }}
                                className="bg-white border border-slate-200/50 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300"
                            >
                                <div className="space-y-4 text-left">
                                    <h4 className="text-sm font-bold text-slate-900">Bloom Salon Blueprint</h4>
                                    
                                    <div className="space-y-2.5 text-xs text-slate-500 font-light leading-relaxed">
                                        <div>
                                            <strong className="font-semibold text-slate-800 block">Industry Problem:</strong>
                                            Stylists were constantly interrupted during client sessions to answer phone texts, or forced to follow up on late-night inquiries.
                                        </div>
                                        <div>
                                            <strong className="font-semibold text-slate-800 block">AI Strategy:</strong>
                                            Configure the Approve-to-Book workflow to handle basic service pricing questions and queue booking requests.
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-100 text-left">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-600 block mb-1">Target Outcome</span>
                                    <div className="text-base font-extrabold text-slate-900 leading-tight">Automate Inbound Leads</div>
                                    <span className="text-[10px] text-slate-400 font-medium font-sans">Projected outcome: +22% booking rate</span>
                                </div>
                            </motion.div>

                            {/* Blueprint 3 */}
                            <motion.div 
                                variants={childFadeUp}
                                whileHover={{ y: -6, scale: 1.01, border: "1px solid rgba(99, 102, 241, 0.2)", boxShadow: "0 15px 35px -10px rgba(99, 102, 241, 0.08)" }}
                                className="bg-white border border-slate-200/50 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300"
                            >
                                <div className="space-y-4 text-left">
                                    <h4 className="text-sm font-bold text-slate-900">Thorne Auto Blueprint</h4>
                                    
                                    <div className="space-y-2.5 text-xs text-slate-500 font-light leading-relaxed">
                                        <div>
                                            <strong className="font-semibold text-slate-800 block">Industry Problem:</strong>
                                            Missing brake and transmission repair inquiries during weekend closed hours, losing local repair leads to large chain service centers.
                                        </div>
                                        <div>
                                            <strong className="font-semibold text-slate-800 block">AI Strategy:</strong>
                                            Train the AI chatbot on standard auto-diagnostic menus, parts rates, and mechanic schedules.
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-100 text-left">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-600 block mb-1">Target Outcome</span>
                                    <div className="text-base font-extrabold text-slate-900 leading-tight">Quote and Route 24/7</div>
                                    <span className="text-[10px] text-slate-400 font-medium font-sans">Projected outcome: +$4,200/mo off-hours</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* 7. Final Conversion Section */}
                <section className="py-16 md:py-24 max-w-4xl mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.85, ease: cubicEasing }}
                        whileHover={{ scale: 1.005, boxShadow: "0 25px 60px -15px rgba(99,102,241,0.25)" }}
                        className="relative bg-slate-900 border border-slate-800 p-8 md:p-16 rounded-[32px] text-center flex flex-col items-center gap-6 shadow-2xl overflow-hidden text-white transition-shadow duration-300"
                    >
                        {/* Decorative radial background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

                        <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-full z-10">
                            Secure Your Calendar
                        </span>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-xl mt-2 z-10 leading-tight">
                            Elevate Your Front Desk with Bramley AI.
                        </h2>
                        
                        <p className="text-xs sm:text-sm text-slate-400 max-w-md font-light leading-relaxed z-10">
                            Entrust your website inquiries to an automated elite concierge. Let us map your rules, secure your guardrails, and activate your custom prototype in 48 hours.
                        </p>
                        
                        <button
                            id="footer-cta"
                            onClick={() => setIsContactOpen(true)}
                            className="z-10 mt-4 px-8 py-4 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-650/25 transition-all duration-300 cursor-pointer flex items-center gap-2"
                        >
                            <span>Request Free Prototype</span>
                            <ChevronRight size={14} />
                        </button>
                    </motion.div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-slate-100 py-12 mt-auto">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-sans text-xs font-extrabold select-none">
                            B
                        </span>
                        <span className="font-sans text-sm tracking-tight text-slate-700 font-bold">
                            Bramley AI
                        </span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-light flex items-center gap-1.5">
                        <span>© 2026 Bramley AI, Inc. All rights reserved.</span>
                        <span>•</span>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                        <span>•</span>
                        <button onClick={() => setIsTermsOpen(true)} className="hover:text-indigo-600 transition-colors cursor-pointer border-0 bg-transparent p-0 text-[11px] font-light text-slate-400">Terms</button>
                    </div>
                </div>
            </footer>

            {/* Persistent Global Floating ChatWidget */}
            <ChatWidget isInline={false} />

            {/* Free Demo Modal Popup */}
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            {/* Legal Terms Modal Popup */}
            <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
        </div>
    );
}

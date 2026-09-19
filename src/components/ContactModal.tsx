"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

const countryFlagMap: Record<string, string> = {
    "+1": "us",
    "+44": "gb",
    "+91": "in",
    "+61": "au",
    "+49": "de",
    "+33": "fr",
    "+971": "ae",
    "+65": "sg",
    "+27": "za",
    "+55": "br",
    "+34": "es",
    "+39": "it",
    "+81": "jp",
};

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [salonName, setSalonName] = useState(""); // Bind this to Business Type/Name
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countryCode, setCountryCode] = useState("+1");

    // Form validation states
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [salonNameError, setSalonNameError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let isValid = true;
        setNameError("");
        setEmailError("");
        setPhoneError("");
        setSalonNameError("");
        setError(null);

        // 1. Name Validation
        if (!name.trim()) {
            setNameError("Full name is required.");
            isValid = false;
        } else if (name.trim().length < 2) {
            setNameError("Name must be at least 2 characters.");
            isValid = false;
        } else if (/[<>]/.test(name)) {
            setNameError("Name contains invalid characters (< or >).");
            isValid = false;
        }

        // 2. Email Validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.trim()) {
            setEmailError("Email address is required.");
            isValid = false;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
        }

        // 3. Phone Validation (Optional, validated if provided)
        if (phone.trim()) {
            const phoneDigitsOnly = phone.replace(/\D/g, "");
            const phoneRegex = /^[+]?[0-9\s()+-]{7,20}$/;
            if (!phoneRegex.test(phone)) {
                setPhoneError("Please enter a valid phone number format.");
                isValid = false;
            } else if (phoneDigitsOnly.length < 7 || phoneDigitsOnly.length > 15) {
                setPhoneError("Phone number must be between 7 and 15 digits.");
                isValid = false;
            }
        }

        // 4. Business Type/Company Name Validation
        if (!salonName.trim()) {
            setSalonNameError("Business type or company name is required.");
            isValid = false;
        } else if (salonName.trim().length < 2) {
            setSalonNameError("Business name must be at least 2 characters.");
            isValid = false;
        } else if (/[<>]/.test(salonName)) {
            setSalonNameError("Business name contains invalid characters (< or >).");
            isValid = false;
        }

        if (!isValid) return;

        setIsSubmitting(true);
        setError(null);

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_SAAS_EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        console.log("EmailJS Environment Status:", {
            serviceId: serviceId ? "set" : "undefined",
            templateId: templateId ? "set" : "undefined",
            publicKey: publicKey ? "set" : "undefined"
        });

        // Simulating email trigger if EmailJS keys are not set
        if (
            !serviceId ||
            !templateId ||
            !publicKey ||
            serviceId === "your_service_id" ||
            templateId === "your_template_id" ||
            publicKey === "your_public_key"
        ) {
            console.warn("EmailJS not configured. Simulating API submit response.");
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setSalonName("");
                    setNameError("");
                    setEmailError("");
                    setPhoneError("");
                    setSalonNameError("");
                    setCountryCode("+1");
                    onClose();
                }, 2000);
            }, 1000);
            return;
        }

        const fullPhone = phone.trim() ? `${countryCode} ${phone.trim()}` : "Not provided";

        const leadHtml = `
          <div style="background-color: #f8fafc; padding: 40px 16px; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #4f46e5; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.03);">
              <tr>
                <td style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td>
                        <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 8px; background-color: #4f46e5; color: #ffffff; text-align: center; font-size: 14px; font-weight: bold; margin-right: 8px; vertical-align: middle;">B</span>
                        <span style="font-size: 16px; font-weight: bold; color: #0f172a; letter-spacing: -0.2px; vertical-align: middle;">Bramley <span style="color: #4f46e5; font-weight: 500;">AI</span></span>
                      </td>
                      <td style="text-align: right;">
                        <span style="display: inline-block; background-color: #e0e7ff; color: #4338ca; border-radius: 9999px; padding: 4px 10px; font-size: 9px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">New AI Lead</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 32px; text-align: left;">
                  <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: bold; color: #0f172a; letter-spacing: -0.5px;">Intake Request Received</h2>
                  <p style="margin: 0 0 24px 0; font-size: 13px; color: #64748b; font-weight: 300; line-height: 1.5;">A new local business client has requested a custom AI receptionist prototype build:</p>
                  
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; width: 35%; font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Owner Name</td>
                        <td style="padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-left: 10px; font-size: 13px; color: #0f172a; font-weight: 500;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Email Address</td>
                        <td style="padding: 12px 0 12px 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #4f46e5; font-weight: 500;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Phone Number</td>
                        <td style="padding: 12px 0 12px 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #0f172a;">${fullPhone}</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 12px; font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Business Type</td>
                        <td style="padding-top: 12px; padding-left: 10px; font-size: 13px; color: #0f172a; font-weight: 500;">${salonName || "Not provided"}</td>
                      </tr>
                    </table>
                  </div>

                  <div style="text-align: center;">
                    <a href="mailto:${email}?subject=Re:%20Bramley%20AI%20Receptionist%20Setup" style="display: inline-block; padding: 12px 28px; background-color: #4f46e5; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 8px; box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);">Reply to Lead</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                  <p style="margin: 0; font-size: 10px; color: #94a3b8; font-weight: 300;">This lead alert notification was automatically generated by Bramley AI.</p>
                </td>
              </tr>
            </table>
          </div>
        `;

        const thankYouHtml = `
          <div style="background-color: #f8fafc; padding: 40px 16px; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #4f46e5; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.03);">
              <tr>
                <td style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
                  <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 8px; background-color: #4f46e5; color: #ffffff; text-align: center; font-size: 14px; font-weight: bold; margin-right: 8px; vertical-align: middle;">B</span>
                  <span style="font-size: 16px; font-weight: bold; color: #0f172a; letter-spacing: -0.2px; vertical-align: middle;">Bramley <span style="color: #4f46e5; font-weight: 500;">AI</span></span>
                </td>
              </tr>
              <tr>
                <td style="padding: 32px; text-align: left;">
                  <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: bold; color: #0f172a; letter-spacing: -0.5px;">Let's build your AI receptionist.</h2>
                  
                  <p style="margin: 0 0 16px 0; font-size: 13px; color: #475569; line-height: 1.6; font-weight: 300;">
                    Thank you, ${name}! We've received your request for <strong>${salonName || "your business"}</strong>. Our team is already auditing your website to draft your custom rules.
                  </p>
                  
                  <p style="margin: 0 0 24px 0; font-size: 13px; color: #475569; line-height: 1.6; font-weight: 300;">
                    We will follow up at <strong>${email}</strong> within 24 hours to schedule a quick 10-minute setup call. Together, we'll map your pricing, availability, and specific booking rules to deploy your prototype.
                  </p>
                  
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 10px; font-weight: bold; text-transform: uppercase; color: #4f46e5; letter-spacing: 0.5px;">Your custom Bramley AI prototype includes:</h4>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12px; color: #475569; line-height: 1.7;">
                      <tr>
                        <td style="vertical-align: top; width: 20px; padding-bottom: 8px; color: #4f46e5; font-weight: bold;">✓</td>
                        <td style="padding-bottom: 8px; font-weight: 300;"><strong>24/7 Automated Response:</strong> Answers patient/client questions and quotes menu rates instantly.</td>
                      </tr>
                      <tr>
                        <td style="vertical-align: top; width: 20px; padding-bottom: 8px; color: #4f46e5; font-weight: bold;">✓</td>
                        <td style="padding-bottom: 8px; font-weight: 300;"><strong>Approve-to-Book Guardrail:</strong> Keeps you in 100% control of your schedule. Approve slots with one click.</td>
                      </tr>
                      <tr>
                        <td style="vertical-align: top; width: 20px; color: #4f46e5; font-weight: bold;">✓</td>
                        <td style="font-weight: 300;"><strong>Done-For-You Integration:</strong> Zero coding or technical expertise needed on your end.</td>
                      </tr>
                    </table>
                  </div>
                  
                  <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748b; font-weight: 300;">Talk soon,</p>
                  <p style="margin: 0; font-size: 13px; font-weight: bold; color: #0f172a;">Sahil Siddiqui</p>
                  <p style="margin: 0; font-size: 10px; color: #94a3b8;">Founder, Bramley AI</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                  <p style="margin: 0; font-size: 10px; color: #94a3b8; font-weight: 300;">© 2026 Bramley AI. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </div>
        `;

        try {
            await emailjs.send(serviceId, templateId, {
                to_email: "sahil.siddiqui.dev0@gmail.com",
                email_subject: `New AI Lead: ${name} (${salonName || "Local Business"})`,
                from_name_header: "Bramley AI",
                reply_to: email,
                email_html: leadHtml
            }, publicKey);

            await emailjs.send(serviceId, templateId, {
                to_email: email,
                email_subject: "Let's build your AI Receptionist! - Bramley AI",
                from_name_header: "Bramley AI",
                reply_to: "no-reply@bramley.ai",
                email_html: thankYouHtml
            }, publicKey);

            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setName("");
                setEmail("");
                setPhone("");
                setSalonName("");
                setNameError("");
                setEmailError("");
                setPhoneError("");
                setSalonNameError("");
                setCountryCode("+1");
                onClose();
            }, 2000);
        } catch (err: unknown) {
            const errorObj = err as { status?: number; text?: string } | null;
            console.error("EmailJS Error:", err);
            setError(errorObj?.text || "Failed to submit request. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        className="relative w-full max-w-md bg-white border border-slate-200/50 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden z-10 text-slate-800"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-all cursor-pointer border-0"
                        >
                            <X size={18} />
                        </button>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col gap-5 text-left"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                            Request Your Free AI Prototype
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-1.5 font-light leading-relaxed">
                                            Let us custom-build a 24/7 receptionist chatbot prototype tailored to your business rules. We deliver it in 48 hours for free.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        {/* Name Input */}
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                    if (nameError) setNameError("");
                                                }}
                                                placeholder="Alex Mercer"
                                                className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-700 outline-none focus:bg-white transition-all ${
                                                    nameError 
                                                        ? "border-rose-400 focus:border-rose-500 bg-rose-50/10" 
                                                        : "border-slate-200/80 focus:border-indigo-600"
                                                }`}
                                            />
                                            {nameError && (
                                                <span className="text-[10px] text-rose-500 font-semibold mt-1">
                                                    ⚠ {nameError}
                                                </span>
                                            )}
                                        </div>

                                        {/* Email Input */}
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                                Email Address
                                            </label>
                                            <input
                                                type="text"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    if (emailError) setEmailError("");
                                                }}
                                                placeholder="alex@company.com"
                                                className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-700 outline-none focus:bg-white transition-all ${
                                                    emailError 
                                                        ? "border-rose-400 focus:border-rose-500 bg-rose-50/10" 
                                                        : "border-slate-200/80 focus:border-indigo-600"
                                                }`}
                                            />
                                            {emailError && (
                                                <span className="text-[10px] text-rose-500 font-semibold mt-1">
                                                    ⚠ {emailError}
                                                </span>
                                            )}
                                        </div>

                                        {/* Phone Input */}
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                                Phone Number
                                            </label>
                                            <div className="flex gap-2">
                                                <div className="relative flex items-center">
                                                    <span className="absolute left-3 w-5 h-3.5 flex items-center justify-center overflow-hidden rounded-sm border border-slate-200/50 pointer-events-none z-10 bg-slate-100">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img 
                                                            src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/flags/4x3/${countryFlagMap[countryCode] || "us"}.svg`} 
                                                            alt="flag" 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </span>
                                                    <select
                                                        value={countryCode}
                                                        onChange={(e) => setCountryCode(e.target.value)}
                                                        className="bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-6 py-2.5 text-xs text-slate-750 outline-none focus:border-indigo-600 focus:bg-white transition-all cursor-pointer appearance-none font-medium"
                                                        style={{ minWidth: "92px" }}
                                                    >
                                                        <option value="+1">+1</option>
                                                        <option value="+44">+44</option>
                                                        <option value="+91">+91</option>
                                                        <option value="+61">+61</option>
                                                        <option value="+49">+49</option>
                                                        <option value="+33">+33</option>
                                                        <option value="+971">+971</option>
                                                        <option value="+65">+65</option>
                                                        <option value="+27">+27</option>
                                                        <option value="+55">+55</option>
                                                        <option value="+34">+34</option>
                                                        <option value="+39">+39</option>
                                                        <option value="+81">+81</option>
                                                    </select>
                                                    <span className="absolute right-2.5 pointer-events-none text-slate-400 text-[8px]">▼</span>
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => {
                                                        setPhone(e.target.value);
                                                        if (phoneError) setPhoneError("");
                                                    }}
                                                    placeholder="(310) 555-0199"
                                                    className={`flex-1 bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-700 outline-none focus:bg-white transition-all ${
                                                        phoneError 
                                                            ? "border-rose-400 focus:border-rose-500 bg-rose-50/10" 
                                                            : "border-slate-200/80 focus:border-indigo-600"
                                                    }`}
                                                />
                                            </div>
                                            {phoneError && (
                                                <span className="text-[10px] text-rose-500 font-semibold mt-1">
                                                    ⚠ {phoneError}
                                                </span>
                                            )}
                                        </div>

                                        {/* Business Type Input */}
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                                Business Type or Company Name
                                            </label>
                                            <input
                                                type="text"
                                                value={salonName}
                                                onChange={(e) => {
                                                    setSalonName(e.target.value);
                                                    if (salonNameError) setSalonNameError("");
                                                }}
                                                placeholder="e.g. Dental Clinic, Salon, Auto Repair"
                                                className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-700 outline-none focus:bg-white transition-all ${
                                                    salonNameError 
                                                        ? "border-rose-400 focus:border-rose-500 bg-rose-50/10" 
                                                        : "border-slate-200/80 focus:border-indigo-600"
                                                }`}
                                            />
                                            {salonNameError && (
                                                <span className="text-[10px] text-rose-500 font-semibold mt-1">
                                                    ⚠ {salonNameError}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {error && (
                                            <div className="text-[11px] text-rose-500 bg-rose-50 border border-rose-100 rounded-xl px-4 py-2 font-medium">
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <span>Connecting...</span>
                                            ) : (
                                                <>
                                                    <span>Request Free Prototype</span>
                                                    <Send size={12} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col items-center justify-center py-8 text-center gap-4"
                                >
                                    <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <Check size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                            Request Submitted
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-2 max-w-[280px] font-light leading-relaxed">
                                            Thank you, {name}! We will reach out to build your custom AI receptionist prototype within 24 hours.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

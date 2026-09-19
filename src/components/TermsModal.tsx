"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
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

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        className="relative w-full max-w-2xl bg-white border border-slate-200/50 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden z-10 text-slate-800 flex flex-col max-h-[85vh] text-left"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                        Terms & Conditions
                                    </h3>
                                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Bramley AI Legal Framework</span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-all cursor-pointer border-0"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Scrollable Terms Content */}
                        <div className="flex-1 overflow-y-auto pr-2 mt-4 space-y-5 text-xs text-slate-500 leading-relaxed font-light scrollbar-thin">
                            
                            <p className="font-medium text-slate-700">
                                Effective Date: June 19, 2026
                            </p>
                            <p>
                                Welcome to Bramley AI. These Terms & Conditions (the &quot;Agreement&quot;) govern the provision of custom, done-for-you AI Receptionist chatbot development and integration services by Bramley AI (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) to your business entity (&quot;Client&quot;, &quot;you&quot;, or &quot;your&quot;).
                            </p>

                            <hr className="border-slate-100" />

                            <div>
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">1. Scope of Services</h4>
                                <p>
                                    Bramley AI specializes in building, training, and integrating custom conversational AI receptionists (&quot;Chatbot&quot;). We configure the tool based on business rules, catalogs, and schedules provided by you, and host the necessary script endpoints.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">2. Client Governance & Accuracy</h4>
                                <p>
                                    You are solely responsible for ensuring the accuracy and validity of all information (prices, scheduling hours, lists of treatments, and policies) provided for chatbot training database configuration. Bramley AI is not liable for errors due to outdated menus or guidelines.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">3. AI Accuracy & Hallucination Disclaimer</h4>
                                <p>
                                    You acknowledge that the Chatbot utilizes large language models (LLMs) and advanced neural systems. Although we implement strict vector-database safety guardrails (RAG) and hallucination filters, generative AI may occasionally return incomplete or incorrect replies. 
                                </p>
                                <p className="mt-1.5">
                                    Bramley AI is not liable for incorrect pricing quotes, booking clashes, or unauthorized claims outputted by the Chatbot. The Client retains manual approval control (the &quot;Approve-to-Book&quot; workflow gateway) and must verify all request payloads before confirming calendar locks.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">4. Data Security & HIPAA Compliance</h4>
                                <p>
                                    Client acknowledges that if their business collects Protected Health Information (PHI) under HIPAA, Client must notify us in writing before setup. A separate Business Associate Agreement (BAA) must be executed before database collection goes live.
                                </p>
                                <p className="mt-1.5">
                                    Client serves as the &quot;Data Controller&quot; and Bramley AI serves as the &quot;Data Processor.&quot; Client is responsible for maintaining an active privacy disclosure policy on their website.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">5. API & Third-Party Dependencies</h4>
                                <p>
                                    The Chatbot relies on third-party APIs (including Google AI Studio, Firebase, and Cal.com). Bramley AI is not responsible for calendar downtime, network failures, or changes in third-party API availability.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">6. Limitation of Liability</h4>
                                <p className="font-semibold text-slate-700">
                                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL BRAMLEY AI BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, OR LOSS OF BUSINESS PROFITS. OUR TOTAL COMBINED LIABILITY SHALL NOT EXCEED THE TOTAL FEES PAID BY CLIENT TO BRAMLEY AI IN THE THREE (3) MONTH PERIOD PRECEDING THE CLAIM.
                                </p>
                            </div>

                        </div>

                        {/* Footer Action */}
                        <div className="pt-4 border-t border-slate-100 flex justify-end mt-4">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer border-0"
                            >
                                Close & Dismiss
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

import type { Metadata } from "next";
import SaasClientPage from "./SaasClientPage";

export const metadata: Metadata = {
  title: "Bramley AI — 24/7 AI Receptionist & Booking Concierge",
  description: "Bramley AI is a premium AI receptionist and booking concierge that qualifies leads, books appointments, and answers inquiries for local service businesses 24/7.",
  keywords: ["AI receptionist", "AI concierge", "booking automation", "appointment scheduler", "SaaS", "Bramley AI", "salon booking", "clinic scheduler"],
  openGraph: {
    title: "Bramley AI — 24/7 AI Receptionist & Booking Concierge",
    description: "Bramley AI is a premium AI receptionist and booking concierge that qualifies leads, books appointments, and answers inquiries for local service businesses 24/7.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bramley AI — 24/7 AI Receptionist & Booking Concierge",
    description: "Bramley AI is a premium AI receptionist and booking concierge that qualifies leads, books appointments, and answers inquiries for local service businesses 24/7.",
  }
};

export default function Page() {
  return <SaasClientPage />;
}

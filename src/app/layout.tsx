import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sahilsiddiqui.me"),
  title: {
    default: "Mohd Sahil Siddiqui | Backend Developer Portfolio",
    template: "%s | Mohd Sahil Siddiqui",
  },
  description: "Portfolio of Mohd Sahil Siddiqui (Mohd Sahil), a Backend Developer specializing in Node.js, Express, and MongoDB. AWS Certified. Open for backend roles and freelance projects.",
  keywords: [
    "Mohd Sahil",
    "Mohd Sahil Siddiqui",
    "Sahil Siddiqui",
    "Mohd Sahil Portfolio",
    "Sahil Siddiqui Developer",
    "Mohd Sahil Developer",
    "backend developer",
    "backend dev",
    "Node.js developer",
    "Express.js",
    "MongoDB",
    "REST API",
    "software engineer",
    "AWS Certified Cloud Practitioner",
    "freelance backend developer",
    "backend internship"
  ],
  authors: [{ name: "Mohd Sahil Siddiqui" }],
  creator: "Mohd Sahil Siddiqui",
  alternates: {
    canonical: "https://sahilsiddiqui.me",
  },
  openGraph: {
    title: "Mohd Sahil Siddiqui | Backend Developer Portfolio",
    description: "Portfolio of Mohd Sahil Siddiqui (Mohd Sahil), a Backend Developer specializing in Node.js, Express, and MongoDB. AWS Certified. Open for backend roles and freelance projects.",
    url: "https://sahilsiddiqui.me",
    siteName: "Mohd Sahil",
    images: [
      {
        url: "/assets/Profile.webp",
        width: 1200,
        height: 630,
        alt: "Mohd Sahil Portrait",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohd Sahil Siddiqui | Backend Developer Portfolio",
    description: "Portfolio of Mohd Sahil Siddiqui (Mohd Sahil), a Backend Developer specializing in Node.js, Express, and MongoDB. AWS Certified. Open for backend roles and freelance projects.",
    images: ["/assets/Profile.webp"],
  },
  icons: {
    icon: "/assets/Profile.webp",
    apple: "/assets/Profile.webp",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohd Sahil Siddiqui",
    alternateName: ["Mohd Sahil", "Sahil Siddiqui"],
    jobTitle: "Backend Developer",
    url: "https://sahilsiddiqui.me",
    sameAs: [
      "https://www.linkedin.com/in/mohd-sahil-siddiqui/",
      "https://github.com/sahilsiddiqui-dev/"
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "KIET Group of Institutions"
    },
    knowsAbout: ["Node.js", "Express.js", "MongoDB", "REST APIs", "AWS"]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

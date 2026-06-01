import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sahilsiddiqui.site"),
  title: "Sahil Siddiqui — Frontend & Flutter Developer",
  description: "A developer who lives at the intersection of web and mobile. I specialize in frontend development and Flutter to bring ideas to life across every screen.",
  keywords: ["web developer", "frontend developer", "Flutter", "React", "Dart", "portfolio", "freelance", "KIET"],
  authors: [{ name: "Sahil Siddiqui" }],
  openGraph: {
    title: "Sahil Siddiqui — Frontend & Flutter Developer",
    description: "A developer who lives at the intersection of web and mobile. I specialize in frontend development and Flutter to bring ideas to life across every screen.",
    url: "https://sahilsiddiqui.site",
    siteName: "Sahil Siddiqui Portfolio",
    images: [
      {
        url: "/assets/Profile.webp",
        width: 800,
        height: 800,
        alt: "Sahil Siddiqui Portrait",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Siddiqui — Frontend & Flutter Developer",
    description: "A developer who lives at the intersection of web and mobile. I specialize in frontend development and Flutter to bring ideas to life across every screen.",
    images: ["/assets/Profile.webp"],
  },
  icons: {
    icon: "/assets/Profile.webp",
    apple: "/assets/Profile.webp",
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
  return (
    <html lang="en">
      <body>
        {/* Animated Background Blobs */}
        <div className="blob blob1" aria-hidden="true" />
        <div className="blob blob2" aria-hidden="true" />
        
        {children}
      </body>
    </html>
  );
}

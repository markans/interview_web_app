import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewAI | The Invisible Edge for Your Tech Career",
  description: "Ace your interviews with real-time AI assistance. 100% open source, privacy-focused, and browser-first. Your private, undetectable career coach.",
  keywords: ["AI interview assistant", "mock interview", "real-time interview help", "open source AI", "career coach", "technical interview prep", "job interview transcription"],
  authors: [{ name: "Markans" }],
  openGraph: {
    title: "InterviewAI | The Invisible Edge for Your Tech Career",
    description: "Real-time AI assistance hidden in plain sight. Privacy-preserving, low-latency, and 100% open source.",
    url: "https://interviewer-ai.vercel.app",
    siteName: "InterviewAI",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "InterviewAI Hero",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewAI | The Invisible Edge for Your Tech Career",
    description: "Real-time AI assistance hidden in plain sight. 100% open source and undetectable.",
    images: ["/hero-bg.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

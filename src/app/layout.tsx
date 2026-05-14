import type { Metadata } from "next";
import { Bebas_Neue, Syne, DM_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aryan Ali Khan",
    template: "%s | Aryan Ali Khan",
  },
  description:
    "Software Engineer & Systems Architect. CS student at FAST-NUCES building AI-augmented systems, concurrent engines, and elite-grade software.",
  keywords: [
    "software engineer",
    "computer science",
    "FAST-NUCES",
    "systems engineer",
    "AI developer",
    "Pakistan",
  ],
  openGraph: {
    title: "Aryan Ali Khan — Systems Engineer",
    description: "Elite engineering portfolio.",
    url: "https://aryan.dev",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Ali Khan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${syne.variable} ${dmMono.variable} ${interTight.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}

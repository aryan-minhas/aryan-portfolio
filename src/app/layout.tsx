import type { Metadata } from "next";
import { Bebas_Neue, Syne, DM_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Navbar      from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Footer      from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aryanminhas.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  'Aryan Ali Khan',
    template: '%s | Aryan Ali Khan',
  },
  description:
    'Software Engineer & Systems Architect. CS student at FAST-NUCES building AI-augmented systems, concurrent engines, and elite-grade software.',
  keywords: [
    'software engineer', 'computer science', 'FAST-NUCES',
    'systems engineer', 'AI developer', 'Pakistan',
    'portfolio', 'Aryan Ali Khan',
  ],
  authors:  [{ name: 'Aryan Ali Khan', url: SITE_URL }],
  creator:  'Aryan Ali Khan',
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title:       'Aryan Ali Khan — Systems Engineer',
    description: 'Eight major engineering projects. Systems programming, AI/ML, game engines, and web platforms.',
    url:         SITE_URL,
    siteName:    'Aryan Ali Khan',
    locale:      'en_US',
    type:        'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Aryan Ali Khan Portfolio' }],
  },
  twitter: {
    card:    'summary_large_image',
    title:   'Aryan Ali Khan — Systems Engineer',
    description: 'Eight major engineering projects across systems, AI/ML, games and web.',
    images:  ['/og-image.png'],
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
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <PageWrapper>
            <main id="main-content">{children}</main>
            <Footer />
          </PageWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

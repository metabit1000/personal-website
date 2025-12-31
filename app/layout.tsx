import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Àlex Aguilera Martínez | Full Stack Developer",
        template: "%s | Àlex Aguilera Martínez"
    },
    description: "Full Stack Developer specializing in modern web technologies. Explore my portfolio featuring Next.js, React, TypeScript, and AI-powered projects. Available for freelance and full-time opportunities.",
    keywords: [
        "Àlex Aguilera Martínez",
        "Full Stack Developer",
        "Web Developer",
        "Next.js Developer",
        "React Developer",
        "TypeScript",
        "JavaScript",
        "Frontend Developer",
        "Backend Developer",
        "Portfolio",
        "AI Chatbot",
        "Software Engineer",
        "Web Development",
        "Freelance Developer"
    ],
    authors: [{ name: "Àlex Aguilera Martínez" }],
    creator: "Àlex Aguilera Martínez",
    publisher: "Àlex Aguilera Martínez",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://alex-aguilera.vercel.app'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://alex-aguilera.vercel.app',
        title: "Àlex Aguilera Martínez | Full Stack Developer",
        description: "Full Stack Developer specializing in modern web technologies. Explore my portfolio featuring Next.js, React, TypeScript, and AI-powered projects.",
        siteName: "Àlex Aguilera Martínez Portfolio",
        images: [
            {
                url: '/og-image.png', // You'll need to create this image
                width: 1200,
                height: 630,
                alt: 'Àlex Aguilera Martínez - Full Stack Developer',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Àlex Aguilera Martínez | Full Stack Developer",
        description: "Full Stack Developer specializing in modern web technologies. Explore my portfolio featuring Next.js, React, TypeScript, and AI-powered projects.",
        images: ['/og-image.png'], // Same image as Open Graph
        creator: '@yourtwitterhandle', // Replace with your Twitter handle
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/icon.png',
        apple: '/apple-icon.png',
    },
    manifest: '/manifest.json',
    verification: {
        google: 'kdKBCgzVmVS4dyILN-TNc1yyWgpmH52UtATSN0eWFRc',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    {children}
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}

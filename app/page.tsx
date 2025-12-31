import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeToggle from "@/components/ThemeToggle";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Header from "@/components/Header";

export default function Home() {
    // Structured data for SEO (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Àlex Aguilera Martínez",
        "jobTitle": "Full Stack Developer",
        "description": "Full Stack Developer specializing in modern web technologies including Next.js, React, TypeScript, and AI-powered applications",
        "url": "https://alex-aguilera.vercel.app/",
        "sameAs": [
            "https://www.linkedin.com/in/alex-aguilera-martinez",
            "https://github.com/metabit1000",
        ],
        "knowsAbout": [
            "Next.js",
            "React",
            "TypeScript",
            "JavaScript",
            "Full Stack Development",
            "Web Development",
            "AI Integration",
            "Frontend Development",
            "Backend Development"
        ],
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Universitat Politècnica de Catalunya"
        }
    };

    return (
        <main className="min-h-screen selection:bg-blue-500/30">
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Header />
            <Hero />
            <Skills />
            <Education />
            <Certifications />
            <Projects />
            <Contact />

            <footer className="py-8 text-center dark:text-gray-600 light:text-gray-500 text-sm dark:border-t dark:border-white/5 light:border-t light:border-gray-200">
                <p>© {new Date().getFullYear()} Àlex Aguilera Martínez. Built with Next.js.</p>
            </footer>

            <ThemeToggle />
            <ScrollToTop />
            <ChatWidget />
        </main>
    );
}

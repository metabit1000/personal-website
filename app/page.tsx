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
    return (
        <main className="min-h-screen selection:bg-blue-500/30">
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

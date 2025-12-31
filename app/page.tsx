import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ChatWidget from "@/components/ChatWidget";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Header from "@/components/Header";

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Header />
            <Hero />
            <Skills />
            <Education />
            <Certifications />
            <Projects />
            <Contact />

            <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
                <p>© {new Date().getFullYear()} Àlex Aguilera Martínez. Built with Next.js.</p>
            </footer>

            <ChatWidget />
        </main>
    );
}

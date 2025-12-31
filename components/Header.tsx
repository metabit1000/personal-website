'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 md:px-20 py-4",
                scrolled ? "bg-black/50 backdrop-blur-md border-b border-white/5" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="cursor-pointer group flex items-center gap-2"
                >
                    <span className="font-bold text-xl tracking-tight group-hover:text-blue-400 transition-colors font-mono">
                        alex<span className="text-blue-500">.dev</span>
                    </span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {['Skills', 'Education', 'Certifications', 'Projects', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                        </button>
                    ))}
                </nav>

                {/* Mobile Menu Button (Placeholder) */}
                <div className="md:hidden">
                    {/* Add mobile menu if needed */}
                </div>
            </div>
        </motion.header>
    );
}

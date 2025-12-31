'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
            setMobileMenuOpen(false); // Close menu after clicking
        }
    };

    const navItems = ['Skills', 'Education', 'Certifications', 'Projects', 'Contact'];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-20 py-4",
                    scrolled
                        ? "dark:bg-black/50 light:bg-white/90 backdrop-blur-md dark:border-b dark:border-white/5 light:border-b light:border-gray-200"
                        : "dark:bg-black/20 light:bg-white/30 backdrop-blur-sm"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="cursor-pointer group flex items-center gap-2"
                    >
                        <span className="font-bold text-xl tracking-tight group-hover:text-blue-400 transition-colors font-mono dark:text-white light:text-gray-900">
                            alex<span className="text-blue-500">.dev</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="text-sm font-medium dark:text-gray-400 dark:hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 dark:text-white light:text-gray-900 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] dark:bg-black/95 light:bg-white/95 backdrop-blur-md border-l dark:border-white/10 light:border-gray-200 z-50 md:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b dark:border-white/10 light:border-gray-200">
                                    <span className="font-bold text-lg font-mono dark:text-white light:text-gray-900">
                                        Menu
                                    </span>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 dark:text-white light:text-gray-900 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex flex-col p-6 gap-2 flex-1">
                                    {navItems.map((item, index) => (
                                        <motion.button
                                            key={item}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => scrollToSection(item.toLowerCase())}
                                            className="text-left px-4 py-3 text-base font-medium dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 light:text-gray-700 light:hover:text-gray-900 light:hover:bg-gray-100 rounded-lg transition-all"
                                        >
                                            {item}
                                        </motion.button>
                                    ))}
                                </nav>

                                {/* Theme Toggle in Mobile Menu */}
                                {mounted && (
                                    <div className="p-6 border-t dark:border-white/10 light:border-gray-200">
                                        <button
                                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                            className="w-full flex items-center justify-between px-4 py-3 text-base font-medium dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 light:text-gray-700 light:hover:text-gray-900 light:hover:bg-gray-100 rounded-lg transition-all"
                                        >
                                            <span>Theme</span>
                                            <div className="flex items-center gap-2">
                                                {theme === 'dark' ? (
                                                    <>
                                                        <Sun size={18} className="text-yellow-400" />
                                                        <span className="text-sm dark:text-gray-400 light:text-gray-600">Light</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Moon size={18} className="text-blue-600" />
                                                        <span className="text-sm dark:text-gray-400 light:text-gray-600">Dark</span>
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

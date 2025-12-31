'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 pt-32 md:pt-0 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
            >


                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 py-2 leading-tight">
                    Àlex Aguilera Martínez
                </h1>

                <h2 className="text-2xl md:text-4xl font-light dark:text-gray-400 light:text-gray-800 mb-8">
                    Full Stack Developer
                </h2>

                <p className="text-lg dark:text-gray-400 light:text-gray-700 max-w-2xl mb-10 leading-relaxed">
                    Over 5 years of experience building robust software solutions.
                    Specializing in Java, Spring Boot, and modern web technologies.
                    Passionate about creating efficient, scalable, and user-centric applications.
                </p>

                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3 dark:bg-white dark:text-black dark:hover:bg-gray-200 light:bg-blue-600 light:text-white light:hover:bg-blue-700 font-medium rounded-full transition-colors flex items-center gap-2 shadow-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        aria-label="View my expertise and skills"
                    >
                        View Expertise <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3 dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10 light:bg-white light:text-gray-900 light:border-gray-300 light:hover:bg-gray-50 font-medium rounded-full border transition-colors backdrop-blur-sm shadow-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/20"
                        aria-label="Scroll to contact section"
                    >
                        Contact Me
                    </button>
                </div>

                <div className="flex gap-6 mt-8">
                    <a href="https://github.com/metabit1000" target="_blank" rel="noopener noreferrer" className="dark:text-gray-400 dark:hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors focus:outline-none focus:text-blue-500" aria-label="Visit my GitHub profile">
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/alex-aguilera-martinez/" target="_blank" rel="noopener noreferrer" className="dark:text-gray-400 dark:hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors focus:outline-none focus:text-blue-500" aria-label="Visit my LinkedIn profile">
                        <Linkedin size={24} />
                    </a>
                </div>

                <div className="mt-8 pt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-500 mb-4 font-mono uppercase tracking-wider">Languages</p>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
                            { name: "Catalan", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/64px-Flag_of_Catalonia.svg.png" },
                            { name: "English", flag: "https://flagcdn.com/w40/gb.png" },
                            { name: "Italian", flag: "https://flagcdn.com/w40/it.png" }
                        ].map((lang) => (
                            <div key={lang.name} className="flex items-center gap-3 px-4 py-2 rounded-full dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 light:bg-gray-100 light:border-gray-300 light:hover:bg-gray-200 border transition-colors cursor-default">
                                <img
                                    src={lang.flag}
                                    alt={lang.name}
                                    className="w-5 h-5 rounded-full object-cover shadow-sm"
                                />
                                <span className="text-sm dark:text-gray-300 light:text-gray-700 font-medium">{lang.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
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
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20"
                >
                    Available for new opportunities
                </motion.span>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 py-2 leading-tight">
                    Àlex Aguilera Martínez
                </h1>

                <h2 className="text-2xl md:text-4xl font-light text-gray-400 mb-8">
                    Full Stack Developer
                </h2>

                <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
                    Over 5 years of experience building robust software solutions.
                    Specializing in Java, Spring Boot, and modern web technologies.
                    Passionate about creating efficient, scalable, and user-centric applications.
                </p>

                <div className="flex flex-wrap gap-4">
                    <a
                        href="#skills"
                        className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        View Expertise <ArrowRight size={18} />
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                        Contact Me
                    </a>
                </div>

                <div className="flex gap-6 mt-8">
                    <a href="https://github.com/metabit1000" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/alex-aguilera-martinez/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin size={24} />
                    </a>
                    <a href="mailto:aslexag0@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                        <Mail size={24} />
                    </a>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-sm text-gray-500 mb-4 font-mono uppercase tracking-wider">Languages</p>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
                            { name: "Catalan", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/64px-Flag_of_Catalonia.svg.png" },
                            { name: "English", flag: "https://flagcdn.com/w40/gb.png" },
                            { name: "Italian", flag: "https://flagcdn.com/w40/it.png" }
                        ].map((lang) => (
                            <div key={lang.name} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                                <img
                                    src={lang.flag}
                                    alt={lang.name}
                                    className="w-5 h-5 rounded-full object-cover shadow-sm"
                                />
                                <span className="text-sm text-gray-300 font-medium">{lang.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

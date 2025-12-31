'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="py-20 px-6 md:px-20 bg-gradient-to-b dark:from-black dark:to-blue-950/20 light:from-gray-50 light:to-blue-50">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                >
                    Let's Work Together
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="dark:text-gray-400 light:text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
                >
                    I'm currently available for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.a
                        href="mailto:aslexag0@gmail.com"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 flex flex-col items-center gap-4 dark:hover:bg-white/10 light:hover:bg-gray-100 transition-colors group"
                    >
                        <div className="p-4 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-xl font-semibold dark:text-white light:text-gray-900">Email</h3>
                        <p className="dark:text-gray-400 light:text-gray-600 text-sm">aslexag0@gmail.com</p>
                    </motion.a>

                    <motion.a
                        href="https://www.linkedin.com/in/alex-aguilera-martinez/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8 flex flex-col items-center gap-4 dark:hover:bg-white/10 light:hover:bg-gray-100 transition-colors group"
                    >
                        <div className="p-4 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                            <Linkedin size={32} />
                        </div>
                        <h3 className="text-xl font-semibold dark:text-white light:text-gray-900">LinkedIn</h3>
                        <p className="dark:text-gray-400 light:text-gray-600 text-sm flex items-center gap-1">
                            Connect <ArrowUpRight size={14} />
                        </p>
                    </motion.a>

                    <motion.a
                        href="https://github.com/metabit1000"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="glass-card p-8 flex flex-col items-center gap-4 dark:hover:bg-white/10 light:hover:bg-gray-100 transition-colors group"
                    >
                        <div className="p-4 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                            <Github size={32} />
                        </div>
                        <h3 className="text-xl font-semibold dark:text-white light:text-gray-900">GitHub</h3>
                        <p className="dark:text-gray-400 light:text-gray-600 text-sm flex items-center gap-1">
                            Follow <ArrowUpRight size={14} />
                        </p>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}

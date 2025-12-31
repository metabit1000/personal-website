'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const education = [
    {
        school: "Universitat Oberta de Catalunya (UOC)",
        degree: "Master in Computer Engineering",
        period: "Mar 2023 - Jun 2025",
        description: "Specialized in Advanced IT Project Management, High Performance Computing, and AI. Grade: 8.7",
    },
    {
        school: "Universitat Politècnica de Catalunya (UPC)",
        degree: "Bachelor in Informatics Engineering",
        period: "Sep 2016 - Jul 2021",
        description: "Specialized in Software Engineering and Web Application Development. Grade: 7.0",
    },
    {
        school: "Institut Premià de Mar",
        degree: "Technological Baccalaureate",
        period: "2014 - 2016",
        description: "Focus on technology and engineering sciences.",
    }
];

export default function Education() {
    return (
        <section id="education" className="py-20 px-6 md:px-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12"
                >
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <GraduationCap className="text-blue-400" size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
                </motion.div>

                <div className="relative border-l-2 dark:border-white/10 light:border-gray-300 ml-6 space-y-12">
                    {education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-black shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                            <div className="glass-card p-6 hover:bg-white/5 transition-colors">
                                <h3 className="text-xl font-bold dark:text-white light:text-gray-900 mb-1">{edu.degree}</h3>
                                <h4 className="text-blue-400 font-medium mb-4">{edu.school}</h4>

                                <div className="flex items-center gap-2 text-sm dark:text-gray-500 light:text-gray-600 mb-4">
                                    <Calendar size={14} />
                                    <span>{edu.period}</span>
                                </div>

                                <p className="dark:text-gray-400 light:text-gray-600 text-sm leading-relaxed">
                                    {edu.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { motion } from 'framer-motion';
import { Server, Code2, Database, Terminal } from 'lucide-react';

const skills = [
    {
        category: "Backend Development",
        icon: Server,
        items: ["Java", "Spring Boot", "Microservices", "REST APIs", "Node.js", "Python", "FastAPI"]
    },
    {
        category: "Frontend & UI",
        icon: Code2,
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Angular"]
    },
    {
        category: "Data & Cloud",
        icon: Database,
        items: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "SAP BTP"]
    },
    {
        category: "DevOps & Tools",
        icon: Terminal,
        items: ["Git", "CI/CD", "Jenkins", "Kibana", "Dynatrace", "Linux", "Jira"]
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-6 md:px-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Technical Expertise
                    </h2>
                    <p className="dark:text-gray-400 light:text-gray-700 max-w-2xl mx-auto text-lg">
                        A comprehensive toolkit of modern technologies I use to build scalable, high-performance applications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {skills.map((category, idx) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-8 group hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    <category.icon size={28} aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-bold dark:text-gray-100 light:text-gray-900 group-hover:text-blue-400 transition-colors">
                                    {category.category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.items.map((item, itemIdx) => (
                                    <motion.span
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (idx * 0.1) + (itemIdx * 0.05) }}
                                        className="px-3 py-1.5 text-sm rounded-lg dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10 light:bg-gray-100 light:border-gray-300 light:text-gray-700 light:hover:bg-gray-200 border hover:border-blue-500/30 hover:text-blue-400 transition-all cursor-default"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

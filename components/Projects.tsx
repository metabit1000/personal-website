'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "Portfolio AI",
        description: "A futuristic personal portfolio built with Next.js 14, featuring a real-time AI chatbot powered by Google Gemini. Includes a custom dark mode design, glassmorphism effects, and smooth Framer Motion animations.",
        tags: ["Next.js", "TypeScript", "AI SDK", "Tailwind", "Framer Motion"],
        link: "https://github.com/metabit1000/personal-website",
    },
    {
        title: "GeoGreenAI",
        description: "Full-stack web app detecting urban green areas from satellite images using DeepLabV3+. Orchestrated with Docker Compose, featuring a FastAPI backend and React frontend with Google Maps integration.",
        tags: ["Python", "FastAPI", "React", "Docker", "Deep Learning"],
        link: "https://github.com/metabit1000/TFM-Urban-green-areas-detection",
    },
    {
        title: "Virtual Network Orchestrator",
        description: "Network virtualization project implementing Internet access redundancy using OpenWrt containers. Features automated deployment scripts, failover protocols (mwan3, keepalived), and Nagios monitoring.",
        tags: ["Docker", "Bash", "OpenWrt", "Networking", "Nagios"],
        link: "https://github.com/metabit1000/TFG-VirtualNetwork-OpenWrt-Docker",
    },
    {
        title: "FeelSafe",
        description: "Android safety application built for Huawei HSD Program 2020. Uses Huawei Mobile Services (HMS) to alert users of dangerous zones, provide real-time environmental data, and enable SOS signaling.",
        tags: ["Android", "Huawei HMS", "Java", "Maps SDK", "Mobile"],
        link: "https://github.com/metabit1000/HSDProgram2020_HUAWEI",
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Featured Projects
                    </h2>
                    <p className="dark:text-gray-400 light:text-gray-700 max-w-2xl mx-auto">
                        A selection of my recent work in software engineering, cloud infrastructure, and full-stack development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-8 group hover:border-blue-500/30 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                <div className="flex gap-3 dark:text-gray-500 light:text-gray-700">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="dark:hover:text-white light:hover:text-gray-900 transition-colors focus:outline-none focus:text-blue-500"
                                        aria-label={`View ${project.title} on GitHub`}
                                    >
                                        <Github size={20} aria-hidden="true" />
                                    </a>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="dark:hover:text-white light:hover:text-gray-900 transition-colors focus:outline-none focus:text-blue-500"
                                        aria-label={`View live demo of ${project.title}`}
                                    >
                                        <ExternalLink size={20} aria-hidden="true" />
                                    </a>
                                </div>
                            </div>

                            <p className="dark:text-gray-400 light:text-gray-700 mb-6 leading-relaxed flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 text-sm dark:text-gray-500 light:text-gray-700 pt-4 border-t dark:border-white/5 light:border-gray-200">
                                <div className="ml-auto text-xs font-mono dark:text-gray-600 light:text-gray-700">
                                    Updated recently
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

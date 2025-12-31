'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, Database, Globe, Smartphone, Terminal, Users, BookOpen } from 'lucide-react';

const certifications = [
    {
        title: "Postman API Fundamentals Student Expert",
        issuer: "Postman",
        date: "Dec 2025",
        skills: ["Postman API", "REST API", "GraphQL"],
        link: "https://badges.parchment.com/public/assertions/C4IZtBwrS3C57BgCMf2ezA?identity__email=alex.aguilera@enel.com&action=download",
        icon: Terminal
    },
    {
        title: "Professional Scrum Master™ I (PSM I)",
        issuer: "Scrum.org",
        date: "Oct 2025",
        skills: ["Agile", "Scrum", "Project Management"],
        link: "https://www.credly.com/badges/f9d9ee2d-ac0c-4776-9f57-cc650c015542/linked_in_profile",
        icon: Users
    },
    {
        title: "MongoDB Associate Developer",
        issuer: "MongoDB",
        date: "Oct 2024",
        skills: ["MongoDB", "NoSQL", "Database Design"],
        link: "https://www.credly.com/badges/6f5837cb-2c88-46db-8f68-dc42ee937850/linked_in_profile",
        icon: Database
    },
    {
        title: "Speexx Italian CEFR Level B2.1",
        issuer: "Speexx",
        date: "Feb 2023",
        skills: ["Italian Language"],
        icon: Globe
    },
    {
        title: "Huawei Mobile Services Course",
        issuer: "Huawei",
        date: "Dec 2020",
        skills: ["Mobile Apps", "HMS Core"],
        icon: Smartphone
    },
    {
        title: "B2 First",
        issuer: "Cambridge English",
        date: "Jun 2019",
        credentialId: "500/2705/0",
        skills: ["English Language"],
        icon: BookOpen
    }
];

export default function Certifications() {
    return (
        <section id="certifications" className="py-24 px-6 md:px-20 relative">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Certifications
                    </h2>
                    <p className="dark:text-gray-400 light:text-gray-700 max-w-2xl mx-auto text-lg">
                        Professional credentials that validate my technical expertise and commitment to continuous learning.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, idx) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-6 flex flex-col gap-4 group hover:bg-white/5 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    <cert.icon size={24} />
                                </div>
                                <span className="text-xs font-mono dark:text-gray-500 light:text-gray-700 border dark:border-white/10 light:border-gray-300 px-2 py-1 rounded-full">
                                    {cert.date}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold dark:text-gray-100 light:text-gray-900 mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {cert.title}
                                </h3>
                                <p className="text-sm dark:text-gray-400 light:text-gray-700">{cert.issuer}</p>
                            </div>

                            {cert.credentialId && (
                                <div className="text-xs dark:text-gray-500 light:text-gray-700 font-mono dark:bg-white/5 light:bg-gray-100 p-2 rounded">
                                    ID: {cert.credentialId}
                                </div>
                            )}

                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map(skill => (
                                        <span key={skill} className="text-xs px-2 py-1 rounded bg-blue-500/5 text-blue-300/80 border border-blue-500/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                {cert.link && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-500 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                                        aria-label={`View ${cert.title} credential`}
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

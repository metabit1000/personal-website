import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('framer-motion', () => ({
    motion: new Proxy(
        {},
        {
            get: (_target, tag) =>
                React.forwardRef(({ children, ...props }: any, ref: any) =>
                    React.createElement(tag as string, { ...props, ref }, children)
                ),
        }
    ),
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

import Skills from '@/components/Skills';

describe('Skills', () => {
    it('renders the "Technical Expertise" heading', () => {
        render(<Skills />);
        expect(screen.getByRole('heading', { name: /technical expertise/i })).toBeInTheDocument();
    });

    it('renders all four skill categories', () => {
        render(<Skills />);
        ['Backend Development', 'Frontend & UI', 'Data & Cloud', 'DevOps & Tools'].forEach((cat) => {
            expect(screen.getByText(cat)).toBeInTheDocument();
        });
    });

    it('renders Backend Development skills', () => {
        render(<Skills />);
        ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'Node.js', 'Python', 'FastAPI'].forEach((skill) => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        });
    });

    it('renders Frontend & UI skills', () => {
        render(<Skills />);
        ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Angular'].forEach((skill) => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        });
    });

    it('renders Data & Cloud skills', () => {
        render(<Skills />);
        ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis', 'SAP BTP'].forEach((skill) => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        });
    });

    it('renders DevOps & Tools skills', () => {
        render(<Skills />);
        ['Git', 'CI/CD', 'Jenkins', 'Kibana', 'Dynatrace', 'Linux', 'Jira'].forEach((skill) => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        });
    });

    it('renders the skills section with the correct id', () => {
        render(<Skills />);
        expect(document.getElementById('skills')).toBeInTheDocument();
    });
});

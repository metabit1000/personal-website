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

import Projects from '@/components/Projects';

describe('Projects', () => {
    it('renders the "Featured Projects" heading', () => {
        render(<Projects />);
        expect(screen.getByRole('heading', { name: /featured projects/i })).toBeInTheDocument();
    });

    it('renders all four project titles', () => {
        render(<Projects />);
        ['Portfolio AI', 'GeoGreenAI', 'Virtual Network Orchestrator', 'FeelSafe'].forEach((title) => {
            expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
        });
    });

    it('renders GitHub links for each project', () => {
        render(<Projects />);
        const githubLinks = screen.getAllByRole('link', { name: /view .* on github/i });
        expect(githubLinks.length).toBe(4);
    });

    it('renders GitHub links with valid href attributes', () => {
        render(<Projects />);
        const githubLinks = screen.getAllByRole('link', { name: /view .* on github/i });
        githubLinks.forEach((link) => {
            expect(link).toHaveAttribute('href', expect.stringContaining('github.com'));
        });
    });

    it('renders external demo links for each project', () => {
        render(<Projects />);
        const demoLinks = screen.getAllByRole('link', { name: /view live demo of/i });
        expect(demoLinks.length).toBe(4);
    });

    it('all external links open in a new tab', () => {
        render(<Projects />);
        const allLinks = screen.getAllByRole('link');
        allLinks.forEach((link) => {
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    it('renders technology tags for Portfolio AI project', () => {
        render(<Projects />);
        ['Next.js', 'TypeScript', 'AI SDK', 'Tailwind', 'Framer Motion'].forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    it('renders technology tags for GeoGreenAI project', () => {
        render(<Projects />);
        // "Python", "FastAPI", "Deep Learning" are unique to this project
        // "React" and "Docker" also appear in other projects, so use getAllByText
        ['Python', 'FastAPI', 'Deep Learning'].forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
        expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Docker').length).toBeGreaterThanOrEqual(1);
    });

    it('renders the projects section with the correct id', () => {
        render(<Projects />);
        expect(document.getElementById('projects')).toBeInTheDocument();
    });
});

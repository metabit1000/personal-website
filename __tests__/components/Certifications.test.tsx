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

import Certifications from '@/components/Certifications';

describe('Certifications', () => {
    it('renders the "Certifications" heading', () => {
        render(<Certifications />);
        expect(screen.getByRole('heading', { name: /^certifications$/i })).toBeInTheDocument();
    });

    it('renders all six certification titles', () => {
        render(<Certifications />);
        [
            'Postman API Fundamentals Student Expert',
            'Professional Scrum Master™ I (PSM I)',
            'MongoDB Associate Developer',
            'Speexx Italian CEFR Level B2.1',
            'Huawei Mobile Services Course',
            'B2 First',
        ].forEach((title) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renders all certification issuer names', () => {
        render(<Certifications />);
        // Use getAllByText for names that may appear multiple times (e.g. "MongoDB" is both issuer and a skill badge)
        expect(screen.getByText('Postman')).toBeInTheDocument();
        expect(screen.getByText('Scrum.org')).toBeInTheDocument();
        expect(screen.getAllByText('MongoDB').length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText('Speexx')).toBeInTheDocument();
        expect(screen.getByText('Huawei')).toBeInTheDocument();
        expect(screen.getByText('Cambridge English')).toBeInTheDocument();
    });

    it('renders the credential ID for the B2 First certification', () => {
        render(<Certifications />);
        expect(screen.getByText(/500\/2705\/0/)).toBeInTheDocument();
    });

    it('renders external credential links for certifications that have them', () => {
        render(<Certifications />);
        const credLinks = screen.getAllByRole('link', { name: /view .* credential/i });
        // Postman, PSM I, and MongoDB have credential links
        expect(credLinks.length).toBe(3);
    });

    it('credential links open in a new tab with correct rel', () => {
        render(<Certifications />);
        const credLinks = screen.getAllByRole('link', { name: /view .* credential/i });
        credLinks.forEach((link) => {
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    it('renders skill badges for each certification', () => {
        render(<Certifications />);
        ['Postman API', 'REST API', 'Agile', 'Scrum', 'NoSQL', 'Italian Language'].forEach((skill) => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        });
    });

    it('renders the certifications section with the correct id', () => {
        render(<Certifications />);
        expect(document.getElementById('certifications')).toBeInTheDocument();
    });

    it('renders date badges for certifications', () => {
        render(<Certifications />);
        ['Dec 2025', 'Oct 2025', 'Oct 2024', 'Feb 2023', 'Dec 2020', 'Jun 2019'].forEach((date) => {
            expect(screen.getByText(date)).toBeInTheDocument();
        });
    });
});

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

import Contact from '@/components/Contact';

describe('Contact', () => {
    it('renders the "Let\'s Work Together" heading', () => {
        render(<Contact />);
        expect(screen.getByRole('heading', { name: /let's work together/i })).toBeInTheDocument();
    });

    it('renders the availability description', () => {
        render(<Contact />);
        expect(screen.getByText(/currently available for new opportunities/i)).toBeInTheDocument();
    });

    it('renders the Email contact card', () => {
        render(<Contact />);
        expect(screen.getByRole('link', { name: /send an email to àlex/i })).toBeInTheDocument();
    });

    it('email link has correct mailto href', () => {
        render(<Contact />);
        const emailLink = screen.getByRole('link', { name: /send an email to àlex/i });
        expect(emailLink).toHaveAttribute('href', 'mailto:aslexag0@gmail.com');
    });

    it('renders the LinkedIn contact card with correct href', () => {
        render(<Contact />);
        const linkedinLink = screen.getByRole('link', { name: /visit my linkedin profile/i });
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/alex-aguilera-martinez/');
    });

    it('renders the GitHub contact card with correct href', () => {
        render(<Contact />);
        const githubLink = screen.getByRole('link', { name: /visit my github profile/i });
        expect(githubLink).toHaveAttribute('href', 'https://github.com/metabit1000');
    });

    it('LinkedIn and GitHub links open in a new tab with correct rel', () => {
        render(<Contact />);
        [
            screen.getByRole('link', { name: /visit my linkedin profile/i }),
            screen.getByRole('link', { name: /visit my github profile/i }),
        ].forEach((link) => {
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    it('renders the contact section with the correct id', () => {
        render(<Contact />);
        expect(document.getElementById('contact')).toBeInTheDocument();
    });

    it('displays the email address text', () => {
        render(<Contact />);
        expect(screen.getByText('aslexag0@gmail.com')).toBeInTheDocument();
    });
});

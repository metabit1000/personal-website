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

import Hero from '@/components/Hero';

describe('Hero', () => {
    it('renders the full name heading', () => {
        render(<Hero />);
        expect(screen.getByRole('heading', { level: 1, name: /àlex aguilera martínez/i })).toBeInTheDocument();
    });

    it('renders the "Full Stack Developer" subtitle', () => {
        render(<Hero />);
        expect(screen.getByRole('heading', { level: 2, name: /full stack developer/i })).toBeInTheDocument();
    });

    it('renders the bio paragraph with key experience text', () => {
        render(<Hero />);
        expect(screen.getByText(/5 years of experience/i)).toBeInTheDocument();
    });

    it('renders the "View Expertise" button', () => {
        render(<Hero />);
        expect(screen.getByRole('button', { name: /view my expertise and skills/i })).toBeInTheDocument();
    });

    it('renders the "Contact Me" button', () => {
        render(<Hero />);
        expect(screen.getByRole('button', { name: /scroll to contact section/i })).toBeInTheDocument();
    });

    it('renders the GitHub social link with correct href', () => {
        render(<Hero />);
        const githubLink = screen.getByRole('link', { name: /visit my github profile/i });
        expect(githubLink).toHaveAttribute('href', 'https://github.com/metabit1000');
    });

    it('renders the LinkedIn social link with correct href', () => {
        render(<Hero />);
        const linkedinLink = screen.getByRole('link', { name: /visit my linkedin profile/i });
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/alex-aguilera-martinez/');
    });

    it('renders all four language badges', () => {
        render(<Hero />);
        ['Spanish', 'Catalan', 'English', 'Italian'].forEach((lang) => {
            expect(screen.getByText(lang)).toBeInTheDocument();
        });
    });

    it('scrolls to skills section when "View Expertise" is clicked', () => {
        const scrollIntoView = vi.fn();
        vi.spyOn(document, 'getElementById').mockReturnValue({ scrollIntoView } as unknown as HTMLElement);

        render(<Hero />);
        screen.getByRole('button', { name: /view my expertise and skills/i }).click();

        expect(document.getElementById).toHaveBeenCalledWith('skills');
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('scrolls to contact section when "Contact Me" is clicked', () => {
        const scrollIntoView = vi.fn();
        vi.spyOn(document, 'getElementById').mockReturnValue({ scrollIntoView } as unknown as HTMLElement);

        render(<Hero />);
        screen.getByRole('button', { name: /scroll to contact section/i }).click();

        expect(document.getElementById).toHaveBeenCalledWith('contact');
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });
});

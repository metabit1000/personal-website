import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';

const mockSetTheme = vi.fn();
let mockTheme = 'dark';

vi.mock('next-themes', () => ({
    useTheme: () => ({ theme: mockTheme, setTheme: mockSetTheme }),
}));

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

import Header from '@/components/Header';

// Capture original addEventListener before any spying so the scroll wrapper can bypass
// React 18's async batching for real DOM events (allowing act() to flush synchronously).
const origAddEvent = window.addEventListener.bind(window);
let mockScrollY = 0;
const scrollYSpy = vi.spyOn(window, 'scrollY', 'get');

describe('Header', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockTheme = 'dark';
        mockScrollY = 0;
        scrollYSpy.mockImplementation(() => mockScrollY);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the logo text "alex.dev"', () => {
        render(<Header />);
        expect(screen.getByText(/alex/)).toBeInTheDocument();
        expect(screen.getByText('.dev')).toBeInTheDocument();
    });

    it('renders all navigation items in the desktop nav', () => {
        render(<Header />);
        const navItems = ['Skills', 'Education', 'Certifications', 'Projects', 'Contact'];
        navItems.forEach((item) => {
            expect(screen.getAllByText(item).length).toBeGreaterThan(0);
        });
    });

    it('renders the mobile menu toggle button', () => {
        render(<Header />);
        expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
    });

    it('opens the mobile menu when the toggle button is clicked', () => {
        render(<Header />);
        const toggleBtn = screen.getByRole('button', { name: /toggle menu/i });
        fireEvent.click(toggleBtn);
        expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
    });

    it('closes the mobile menu when the close button is clicked', () => {
        render(<Header />);
        fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }));
        fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
        expect(screen.queryByRole('button', { name: /close menu/i })).not.toBeInTheDocument();
    });

    it('calls scrollIntoView when a nav item is clicked', () => {
        const scrollIntoView = vi.fn();
        const mockEl = { scrollIntoView };
        vi.spyOn(document, 'getElementById').mockReturnValue(mockEl as unknown as HTMLElement);

        render(<Header />);
        const skillsButtons = screen.getAllByRole('button', { name: /scroll to skills/i });
        fireEvent.click(skillsButtons[0]);

        expect(document.getElementById).toHaveBeenCalledWith('skills');
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('calls window.scrollTo when the logo is clicked', () => {
        const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
        render(<Header />);
        fireEvent.click(screen.getByRole('button', { name: /back to top/i }));
        expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('adds background styling after scrolling past 50px', () => {
        // Wrap scroll listeners: calling them with a plain object (not a real DOM Event)
        // bypasses React 18 async event batching, so act() can flush the state update.
        const addSpy = vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
            if (type === 'scroll') {
                const wrapper = () => (listener as Function)({} as any);
                return origAddEvent(type, wrapper as any, options);
            }
            return origAddEvent(type, listener as any, options);
        });

        render(<Header />);

        // Initially not scrolled — header has backdrop-blur-sm (not -md)
        expect(screen.getByRole('banner').className).not.toContain('backdrop-blur-md');

        act(() => {
            mockScrollY = 100;
            window.dispatchEvent(new Event('scroll'));
        });

        // After scrolling past 50px the header acquires backdrop-blur-md
        expect(screen.getByRole('banner').className).toContain('backdrop-blur-md');
        addSpy.mockRestore();
    });
});

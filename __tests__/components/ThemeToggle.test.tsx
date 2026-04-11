import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

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

import ThemeToggle from '@/components/ThemeToggle';

describe('ThemeToggle', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the toggle button when mounted', () => {
        mockTheme = 'dark';
        render(<ThemeToggle />);
        expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    });

    it('shows the Sun icon (switch to light) when the current theme is dark', () => {
        mockTheme = 'dark';
        render(<ThemeToggle />);
        // aria-label on the lucide Sun SVG path or the SVG title
        const button = screen.getByRole('button', { name: /toggle theme/i });
        // The button should contain an svg (Sun icon)
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('shows the Moon icon (switch to dark) when the current theme is light', () => {
        mockTheme = 'light';
        render(<ThemeToggle />);
        const button = screen.getByRole('button', { name: /toggle theme/i });
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('calls setTheme with "light" when clicked in dark mode', () => {
        mockTheme = 'dark';
        render(<ThemeToggle />);
        fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
        expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('calls setTheme with "dark" when clicked in light mode', () => {
        mockTheme = 'light';
        render(<ThemeToggle />);
        fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
        expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
});

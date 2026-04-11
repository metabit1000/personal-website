import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ScrollToTop from '@/components/ScrollToTop';

// framer-motion mock: render children directly, forward all props
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

let mockScrollY = 0;
const scrollYSpy = vi.spyOn(window, 'scrollY', 'get');

describe('ScrollToTop', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    beforeEach(() => {
        mockScrollY = 0;
        scrollYSpy.mockImplementation(() => mockScrollY);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('does not render the button when scrollY is 0', () => {
        render(<ScrollToTop />);
        expect(screen.queryByRole('button', { name: /scroll to top/i })).not.toBeInTheDocument();
    });

    it('renders the button when scrollY exceeds 300', () => {
        render(<ScrollToTop />);

        act(() => {
            mockScrollY = 400;
            window.dispatchEvent(new Event('scroll'));
        });

        expect(screen.getByRole('button', { name: /scroll to top/i })).toBeInTheDocument();
    });

    it('hides the button again when scrollY drops back to or below 300', () => {
        render(<ScrollToTop />);

        act(() => {
            mockScrollY = 400;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(screen.getByRole('button', { name: /scroll to top/i })).toBeInTheDocument();

        act(() => {
            mockScrollY = 100;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(screen.queryByRole('button', { name: /scroll to top/i })).not.toBeInTheDocument();
    });

    it('calls window.scrollTo with top:0 when the button is clicked', () => {
        render(<ScrollToTop />);

        act(() => {
            mockScrollY = 400;
            window.dispatchEvent(new Event('scroll'));
        });

        fireEvent.click(screen.getByRole('button', { name: /scroll to top/i }));
        expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('registers a scroll event listener on mount', () => {
        render(<ScrollToTop />);
        const scrollListeners = addEventListenerSpy.mock.calls.filter(([type]) => type === 'scroll');
        expect(scrollListeners.length).toBeGreaterThan(0);
    });

    it('removes the scroll event listener on unmount', () => {
        const { unmount } = render(<ScrollToTop />);
        unmount();
        const removedScrollListeners = removeEventListenerSpy.mock.calls.filter(([type]) => type === 'scroll');
        expect(removedScrollListeners.length).toBeGreaterThan(0);
    });
});

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

import Education from '@/components/Education';

describe('Education', () => {
    it('renders the "Education" heading', () => {
        render(<Education />);
        expect(screen.getByRole('heading', { name: /^education$/i })).toBeInTheDocument();
    });

    it('renders the UOC Master degree entry', () => {
        render(<Education />);
        expect(screen.getByText(/master in computer engineering/i)).toBeInTheDocument();
        expect(screen.getByText(/universitat oberta de catalunya/i)).toBeInTheDocument();
    });

    it('renders the UPC Bachelor degree entry', () => {
        render(<Education />);
        expect(screen.getByText(/bachelor in informatics engineering/i)).toBeInTheDocument();
        expect(screen.getByText(/universitat politècnica de catalunya/i)).toBeInTheDocument();
    });

    it('renders the Baccalaureate entry', () => {
        render(<Education />);
        expect(screen.getByText(/technological baccalaureate/i)).toBeInTheDocument();
        expect(screen.getByText(/institut premià de mar/i)).toBeInTheDocument();
    });

    it('renders the study period for the Master degree', () => {
        render(<Education />);
        expect(screen.getByText(/mar 2023 - jun 2025/i)).toBeInTheDocument();
    });

    it('renders the study period for the Bachelor degree', () => {
        render(<Education />);
        expect(screen.getByText(/sep 2016 - jul 2021/i)).toBeInTheDocument();
    });

    it('renders the study period for the Baccalaureate', () => {
        render(<Education />);
        expect(screen.getByText('2014 - 2016')).toBeInTheDocument();
    });

    it('renders the education section with the correct id', () => {
        render(<Education />);
        expect(document.getElementById('education')).toBeInTheDocument();
    });

    it('renders three education entries', () => {
        render(<Education />);
        // Each entry has a calendar icon + period text pair — check unique period texts
        const periods = ['Mar 2023 - Jun 2025', 'Sep 2016 - Jul 2021', '2014 - 2016'];
        periods.forEach((period) => {
            expect(screen.getByText(period)).toBeInTheDocument();
        });
    });
});

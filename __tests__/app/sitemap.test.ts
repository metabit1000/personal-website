import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('sitemap', () => {
    it('returns an array with one entry', () => {
        const result = sitemap();
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(1);
    });

    it('returns the correct base URL', () => {
        const result = sitemap();
        expect(result[0].url).toBe('https://alex-aguilera.vercel.app');
    });

    it('sets the priority to 1', () => {
        const result = sitemap();
        expect(result[0].priority).toBe(1);
    });

    it('sets the changeFrequency to monthly', () => {
        const result = sitemap();
        expect(result[0].changeFrequency).toBe('monthly');
    });

    it('returns a recent lastModified date', () => {
        const before = new Date();
        const result = sitemap();
        const after = new Date();
        const lastModified = result[0].lastModified as Date;
        expect(lastModified.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(lastModified.getTime()).toBeLessThanOrEqual(after.getTime());
    });
});

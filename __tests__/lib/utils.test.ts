import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
    it('returns a single class name unchanged', () => {
        expect(cn('text-red-500')).toBe('text-red-500');
    });

    it('merges multiple class names', () => {
        expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
    });

    it('handles conditional classes - truthy condition includes the class', () => {
        expect(cn('base', true && 'active')).toBe('base active');
    });

    it('handles conditional classes - falsy condition omits the class', () => {
        expect(cn('base', false && 'inactive')).toBe('base');
    });

    it('handles undefined and null inputs without throwing', () => {
        expect(cn('base', undefined, null)).toBe('base');
    });

    it('handles empty string inputs', () => {
        expect(cn('', 'text-sm')).toBe('text-sm');
    });

    it('merges conflicting Tailwind classes, keeping the last one', () => {
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });

    it('merges conflicting padding classes', () => {
        expect(cn('p-4', 'px-6')).toBe('p-4 px-6');
    });

    it('merges conflicting text-size classes, keeping the last one', () => {
        expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    });

    it('handles an object with conditional classes', () => {
        expect(cn({ 'font-bold': true, 'font-normal': false })).toBe('font-bold');
    });

    it('handles arrays of class names', () => {
        expect(cn(['flex', 'items-center'])).toBe('flex items-center');
    });

    it('returns an empty string when called with no arguments', () => {
        expect(cn()).toBe('');
    });

    it('handles a mix of strings, objects, and arrays', () => {
        const result = cn('base', { active: true }, ['text-sm']);
        expect(result).toBe('base active text-sm');
    });

    it('deduplicates identical Tailwind classes', () => {
        expect(cn('text-sm', 'text-sm')).toBe('text-sm');
    });
});

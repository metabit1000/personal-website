import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the AI SDK modules before importing the route
vi.mock('@ai-sdk/google', () => ({
    google: vi.fn(() => 'mock-model'),
}));

vi.mock('ai', () => ({
    streamText: vi.fn(),
    convertToModelMessages: vi.fn(async (msgs) => msgs),
}));

import { POST } from '@/app/api/chat/route';
import { streamText } from 'ai';

const mockStreamText = vi.mocked(streamText);

function makeRequest(body: unknown): Request {
    return new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

describe('POST /api/chat', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls streamText with the user messages and returns a streaming response', async () => {
        const fakeStream = { toUIMessageStreamResponse: vi.fn().mockReturnValue(new Response('ok')) };
        mockStreamText.mockResolvedValue(fakeStream as any);

        const req = makeRequest({ messages: [{ role: 'user', parts: [{ type: 'text', text: 'Hello' }] }] });
        const response = await POST(req);

        expect(mockStreamText).toHaveBeenCalledOnce();
        expect(fakeStream.toUIMessageStreamResponse).toHaveBeenCalledOnce();
        expect(response).toBeInstanceOf(Response);
    });

    it('passes the system prompt and model to streamText', async () => {
        const fakeStream = { toUIMessageStreamResponse: vi.fn().mockReturnValue(new Response('ok')) };
        mockStreamText.mockResolvedValue(fakeStream as any);

        const req = makeRequest({ messages: [] });
        await POST(req);

        const callArgs = mockStreamText.mock.calls[0][0];
        expect(callArgs).toHaveProperty('system');
        expect(typeof callArgs.system).toBe('string');
        expect(callArgs.system).toContain('Àlex Aguilera Martínez');
        expect(callArgs).toHaveProperty('model', 'mock-model');
    });

    it('returns 429 when a rate-limit error is thrown', async () => {
        const rateLimitError = Object.assign(new Error('Too Many Requests'), { status: 429 });
        mockStreamText.mockRejectedValue(rateLimitError);

        const req = makeRequest({ messages: [] });
        const response = await POST(req);

        expect(response.status).toBe(429);
        const body = await response.json();
        expect(body.error).toMatch(/rate limit/i);
    });

    it('returns 500 with the error message for a generic error', async () => {
        const genericError = new Error('Something went wrong');
        mockStreamText.mockRejectedValue(genericError);

        const req = makeRequest({ messages: [] });
        const response = await POST(req);

        expect(response.status).toBe(500);
        const body = await response.json();
        expect(body.error).toBe('Something went wrong');
    });

    it('returns the error status from the thrown error when available', async () => {
        const serverError = Object.assign(new Error('Service Unavailable'), { status: 503 });
        mockStreamText.mockRejectedValue(serverError);

        const req = makeRequest({ messages: [] });
        const response = await POST(req);

        expect(response.status).toBe(503);
        const body = await response.json();
        expect(body.error).toBe('Service Unavailable');
    });

    it('returns 500 with "Internal Server Error" when error has no message', async () => {
        const emptyError = Object.assign(new Error(), { message: '' });
        mockStreamText.mockRejectedValue(emptyError);

        const req = makeRequest({ messages: [] });
        const response = await POST(req);

        expect(response.status).toBe(500);
        const body = await response.json();
        expect(body.error).toBe('Internal Server Error');
    });

    it('exports a maxDuration of 30', async () => {
        const routeModule = await import('@/app/api/chat/route');
        expect(routeModule.maxDuration).toBe(30);
    });
});

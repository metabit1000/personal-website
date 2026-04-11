import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Minimal useChat mock that can be updated per test
const mockSendMessage = vi.fn();
const mockRegenerate = vi.fn();
const mockStop = vi.fn();

let chatState: {
    messages: any[];
    status: string;
    error: Error | null;
} = { messages: [], status: 'ready', error: null };

vi.mock('@ai-sdk/react', () => ({
    useChat: vi.fn(() => ({
        messages: chatState.messages,
        sendMessage: mockSendMessage,
        status: chatState.status,
        error: chatState.error,
        regenerate: mockRegenerate,
        stop: mockStop,
    })),
}));

vi.mock('ai', () => ({
    DefaultChatTransport: vi.fn(function () {}),
}));

vi.mock('react-markdown', () => ({
    default: ({ children }: any) => <span>{children}</span>,
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

import ChatWidget from '@/components/ChatWidget';

describe('ChatWidget', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        chatState = { messages: [], status: 'ready', error: null };
    });

    it('renders the chat toggle button', () => {
        render(<ChatWidget />);
        expect(screen.getByRole('button', { name: /open chat assistant/i })).toBeInTheDocument();
    });

    it('does not render the chat panel initially', () => {
        render(<ChatWidget />);
        expect(screen.queryByRole('heading', { name: /ai assistant/i })).not.toBeInTheDocument();
    });

    it('opens the chat panel when the toggle button is clicked', () => {
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));
        expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    });

    it('shows the close button when the chat is open', () => {
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));
        // When open, both the toggle button and the panel header show "Close chat assistant"
        const closeBtns = screen.getAllByRole('button', { name: /close chat assistant/i });
        expect(closeBtns.length).toBeGreaterThanOrEqual(1);
    });

    it('closes the chat panel when the close button in the header is clicked', () => {
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));
        // The panel header has a dedicated close button; click the first one that is NOT the toggle
        const closeBtns = screen.getAllByRole('button', { name: /close chat assistant/i });
        // The header close button has a specific class; click the first panel close button
        fireEvent.click(closeBtns[0]);
        expect(screen.queryByText('AI Assistant')).not.toBeInTheDocument();
    });

    it('shows the empty-state message when there are no messages', () => {
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));
        expect(screen.getByText(/ask me about his experience/i)).toBeInTheDocument();
    });

    it('renders existing messages when the chat is open', () => {
        chatState.messages = [
            { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hello there' }] },
            { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'Hi! How can I help?' }] },
        ];
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));
        expect(screen.getByText('Hello there')).toBeInTheDocument();
        expect(screen.getByText('Hi! How can I help?')).toBeInTheDocument();
    });

    it('calls sendMessage with the input text on form submit', () => {
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));

        const inputEl = screen.getByPlaceholderText(/type a message/i);
        fireEvent.change(inputEl, { target: { value: 'What is your experience?' } });
        fireEvent.click(screen.getByRole('button', { name: /send message/i }));

        expect(mockSendMessage).toHaveBeenCalledWith({ text: 'What is your experience?' });
    });

    it('input is cleared after sending (send button becomes disabled)', async () => {
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));

        const inputEl = screen.getByPlaceholderText(/type a message/i);
        fireEvent.change(inputEl, { target: { value: 'Hello' } });

        // Button is enabled when there is text
        expect(screen.getByRole('button', { name: /send message/i })).not.toBeDisabled();

        fireEvent.click(screen.getByRole('button', { name: /send message/i }));

        // After sending, input is cleared - send button becomes disabled
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
        });
    });

    it('does not call sendMessage when input is empty or only whitespace', () => {
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));

        const input = screen.getByPlaceholderText(/type a message/i);
        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.submit(input.closest('form')!);

        expect(mockSendMessage).not.toHaveBeenCalled();
    });

    it('disables the input and send button while loading', () => {
        chatState.status = 'streaming';
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));

        expect(screen.getByPlaceholderText(/type a message/i)).toBeDisabled();
        expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
    });

    it('shows a loading indicator while streaming', () => {
        chatState.status = 'streaming';
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));
        expect(screen.getByText(/thinking/i)).toBeInTheDocument();
    });

    it('shows error message and a Retry button when status is error', () => {
        chatState.status = 'error';
        chatState.error = new Error('Rate limit exceeded. Please try again later.');
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));

        expect(screen.getByText(/rate limit exceeded/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('calls regenerate when the Retry button is clicked', () => {
        chatState.status = 'error';
        chatState.error = new Error('Something went wrong');
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));
        fireEvent.click(screen.getByRole('button', { name: /retry/i }));

        expect(mockRegenerate).toHaveBeenCalledOnce();
    });

    it('parses JSON error messages from the error object', () => {
        chatState.status = 'error';
        chatState.error = new Error(JSON.stringify({ error: 'Custom parsed error' }));
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));

        expect(screen.getByText('Custom parsed error')).toBeInTheDocument();
    });

    it('strips the "Error: " prefix from error messages', () => {
        chatState.status = 'error';
        chatState.error = new Error('Error: Something failed');
        render(<ChatWidget />);
        fireEvent.click(screen.getByRole('button', { name: /open chat assistant/i }));

        expect(screen.getByText('Something failed')).toBeInTheDocument();
    });
});

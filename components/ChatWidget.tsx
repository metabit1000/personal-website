'use client';

import { useChat } from 'ai/react';
import { Send, Bot, User, X, MessageSquare, Loader2, RefreshCw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload } = useChat({
        onError: (error) => {
            console.error('Chat error:', error);
        }
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[380px] md:w-[450px] h-[600px] glass-card flex flex-col shadow-2xl overflow-hidden border border-white/10"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                                    <Bot size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm">AI Assistant</h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-60">
                                    <Bot size={48} className="text-blue-400 mb-4 opacity-50" />
                                    <p className="text-sm text-gray-300">
                                        Hi! I'm Àlex's AI assistant. Ask me about his experience, skills, or projects.
                                    </p>
                                </div>
                            )}

                            {messages.map(m => (
                                <div
                                    key={m.id}
                                    className={`flex items-start gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                        }`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${m.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'
                                            }`}
                                    >
                                        {m.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-blue-400" />}
                                    </div>
                                    <div
                                        className={`p-3 rounded-2xl text-sm max-w-[80%] shadow-sm ${m.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-sm'
                                            : 'bg-zinc-800/80 text-gray-200 border border-white/5 rounded-tl-sm'
                                            }`}
                                    >
                                        <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent">
                                            <ReactMarkdown
                                                components={{
                                                    ul: ({ children }: any) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                                                    ol: ({ children }: any) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                                                    li: ({ children }: any) => <li className="mb-1">{children}</li>,
                                                    p: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
                                                    strong: ({ children }: any) => <span className="font-bold text-blue-300">{children}</span>,
                                                    a: ({ href, children }: any) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{children}</a>
                                                }}
                                            >
                                                {m.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-center gap-2 text-gray-500 text-xs ml-10">
                                    <Loader2 size={12} className="animate-spin" />
                                    <span>Thinking...</span>
                                </div>
                            )}

                            {error && (
                                <div className="mx-auto max-w-[90%] p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs flex flex-col gap-2">
                                    <p>Error: {error.message}</p>
                                    <button
                                        onClick={() => reload()}
                                        className="flex items-center gap-1 self-end hover:text-white transition-colors"
                                    >
                                        <RefreshCw size={12} /> Retry
                                    </button>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-white/5 backdrop-blur-md">
                            <div className="relative flex items-center">
                                <input
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-gray-500 transition-all"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type a message..."
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-1.5 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-colors z-50"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
}

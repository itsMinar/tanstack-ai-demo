'use client';

import {fetchServerSentEvents, useChat} from '@tanstack/ai-react';
import {Bot, Send, Sparkles, User} from 'lucide-react';
import type React from 'react';
import {useEffect, useRef, useState} from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {messages, sendMessage, isLoading} = useChat({
    connection: fetchServerSentEvents('/api/chat'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  return (
    <div className='flex flex-col h-screen bg-background'>
      {/* Header */}
      <header className='border-b border-border bg-card px-6 py-4 shadow-sm'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground'>
            <Sparkles className='h-5 w-5' />
          </div>
          <div>
            <h1 className='text-lg font-semibold text-foreground'>
              AI Assistant
            </h1>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className='flex-1 overflow-y-auto px-4 py-6'>
        {messages.length === 0 ? (
          <div className='flex h-full items-center justify-center'>
            <div className='text-center space-y-3'>
              <div className='flex justify-center'>
                <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                  <Bot className='h-8 w-8' />
                </div>
              </div>
              <h2 className='text-xl font-semibold text-foreground'>
                Start a conversation
              </h2>
              <p className='text-muted-foreground max-w-sm'>
                Ask me anything and I'll do my best to help you out.
              </p>
            </div>
          </div>
        ) : (
          <div className='mx-auto max-w-3xl space-y-6'>
            {messages.map((message) =>
              message.role === 'assistant' &&
              message.parts.length === 0 ? null : (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'assistant'
                      ? 'flex-row'
                      : 'flex-row-reverse'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      message.role === 'assistant'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <Bot className='h-5 w-5' />
                    ) : (
                      <User className='h-5 w-5' />
                    )}
                  </div>

                  {/* Message Content */}
                  <div
                    className={`flex flex-col gap-2 ${
                      message.role === 'assistant' ? 'items-start' : 'items-end'
                    } flex-1`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-sm ${
                        message.role === 'assistant'
                          ? 'bg-card text-card-foreground border border-border'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {message.parts.map((part, idx) => {
                        if (part.type === 'thinking') {
                          return (
                            <div
                              key={idx}
                              className={`flex items-start gap-2 text-sm italic mb-2 pb-2 border-b ${
                                message.role === 'assistant'
                                  ? 'border-border text-muted-foreground'
                                  : 'border-primary-foreground/20 text-primary-foreground/70'
                              }`}
                            >
                              <Sparkles className='h-4 w-4 mt-0.5 shrink-0' />
                              <span>{part.content}</span>
                            </div>
                          );
                        }
                        if (part.type === 'text') {
                          return (
                            <div
                              key={idx}
                              className='text-[15px] leading-relaxed whitespace-pre-wrap wrap-break-word'
                            >
                              {part.content}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className='flex gap-3'>
                <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground'>
                  <Bot className='h-5 w-5' />
                </div>
                <div className='flex items-center gap-1 rounded-2xl bg-card border border-border px-4 py-3 shadow-sm'>
                  <div className='flex gap-1'>
                    <div className='h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]' />
                    <div className='h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]' />
                    <div className='h-2 w-2 animate-bounce rounded-full bg-primary' />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className='border-t border-border bg-card/50 backdrop-blur-sm px-4 py-4'>
        <form onSubmit={handleSubmit} className='mx-auto max-w-3xl'>
          <div className='relative flex items-center gap-2 rounded-2xl border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type your message...'
              className='flex-1 bg-transparent px-5 py-3.5 text-[15px] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
              disabled={isLoading}
            />
            <button
              type='submit'
              disabled={!input.trim() || isLoading}
              className='mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary'
              aria-label='Send message'
            >
              <Send className='h-4 w-4' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

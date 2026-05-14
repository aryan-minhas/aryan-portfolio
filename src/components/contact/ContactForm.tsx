'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FormState {
  name:    string;
  email:   string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm]     = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError]   = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setStatus('submitting');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col justify-center gap-6 py-12">
        <p className="font-mono text-xs text-cyan tracking-[0.3em] uppercase">
          MESSAGE RECEIVED
        </p>
        <h3
          className="font-display text-ink leading-none"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          GOT IT.
        </h3>
        <p className="font-body text-sm text-ink-muted max-w-xs leading-relaxed">
          Thanks, {form.name.split(' ')[0]}. I&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => { setForm({ name: '', email: '', message: '' }); setStatus('idle'); }}
          className="self-start font-mono text-xs text-ink-faint hover:text-cyan tracking-[0.2em] uppercase transition-colors duration-300 mt-2"
        >
          SEND ANOTHER →
        </button>
      </div>
    );
  }

  const inputClass = cn(
    'w-full bg-transparent font-body text-sm text-ink py-3 px-0',
    'border-b border-[var(--color-border)]',
    'outline-none focus:border-cyan transition-colors duration-300',
    'placeholder:text-ink-faint'
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
      <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase">
        SEND A MESSAGE
      </p>

      <div>
        <label
          htmlFor="name"
          className="font-mono text-[10px] text-ink-faint tracking-[0.25em] uppercase block mb-2"
        >
          NAME
        </label>
        <input
          id="name" name="name" type="text"
          value={form.name} onChange={handleChange}
          autoComplete="name"
          placeholder="Your full name"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="font-mono text-[10px] text-ink-faint tracking-[0.25em] uppercase block mb-2"
        >
          EMAIL
        </label>
        <input
          id="email" name="email" type="email"
          value={form.email} onChange={handleChange}
          autoComplete="email"
          placeholder="your@email.com"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-mono text-[10px] text-ink-faint tracking-[0.25em] uppercase block mb-2"
        >
          MESSAGE
        </label>
        <textarea
          id="message" name="message"
          value={form.message} onChange={handleChange}
          rows={6}
          placeholder="What are we building?"
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {error && (
        <p className="font-mono text-[10px] text-amber tracking-[0.2em]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="self-start font-mono text-xs tracking-[0.25em] uppercase px-10 py-4 text-cyan border border-cyan/50 hover:border-cyan hover:bg-cyan/5 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'SENDING…' : 'SEND MESSAGE →'}
      </button>
    </form>
  );
}

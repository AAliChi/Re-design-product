/* Messaging with your coach. Messages are not saved — it's a prototype. */
import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { coach, coachThread, type CoachMessage } from '@/data/content';
import { useAppState } from '@/state/AppState';
import { cn } from '@/lib/utils';

export function Coach() {
  const { persona } = useAppState();
  const [messages, setMessages] = useState<CoachMessage[]>(() => coachThread(persona.name));
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: 'me', text, time: 'Now' }]);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), from: 'coach', text: "Thanks! I'll get back to you within 24 hours.", time: 'Now' },
      ]);
    }, 900);
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      <div className="mb-6 flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-full bg-rose-soft font-display text-lg font-semibold text-rose">
          {coach.initials}
        </span>
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">{coach.name}</h1>
          <p className="text-sm text-muted-foreground">{coach.role} · usually replies within a day</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {messages.map((m) => (
          <div key={m.id} className={cn('flex flex-col', m.from === 'me' ? 'items-end' : 'items-start')}>
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
                m.from === 'me' ? 'rounded-br-md bg-foreground text-background' : 'rounded-bl-md bg-card shadow-sm',
              )}
            >
              {m.text}
            </div>
            <span className="mt-1 px-1 text-[11px] text-muted-foreground">{m.time}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="mt-6 flex items-end gap-2 rounded-2xl border bg-card p-2 shadow-sm"
      >
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={`Message ${coach.name.split(' ')[0]}…`}
          className="min-h-10 resize-none border-0 shadow-none focus-visible:ring-0"
        />
        <Button type="submit" size="icon" className="shrink-0 rounded-full" aria-label="Send">
          <Send />
        </Button>
      </form>
    </div>
  );
}

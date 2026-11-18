import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Mic, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssistantRobot } from "@/components/assistant-robot";
import { BackChevron } from "@/components/identity-icons";

export const WELCOME_MESSAGE = "Γεια σου! Πώς μπορώ να σε βοηθήσω;";
export const DEMO_REPLY = "Είμαι σε λειτουργία επίδειξης, οπότε δεν μπορώ να απαντήσω ακόμη.";

type Message = { id: number; from: "bot" | "user"; text: string };

const fresh = (): Message[] => [{ id: 0, from: "bot", text: WELCOME_MESSAGE }];

/** Demo-only assistant chat: messages live in memory and replies are a fixed demo text (no AI). */
export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>(fresh);
  const [draft, setDraft] = useState("");
  const nextId = useRef(1);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => () => { if (replyTimer.current) clearTimeout(replyTimer.current); }, []);
  useEffect(() => { end.current?.scrollIntoView?.({ block: "end" }); }, [messages]);

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text }]);
    setDraft("");
    input.current?.focus();
    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", text: DEMO_REPLY }]);
    }, 700);
  };

  const restart = () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
    setMessages(fresh());
    setDraft("");
    input.current?.focus();
  };

  return (
    <div className="flex h-dvh flex-col bg-chat-surface text-chat-ink">
      <header className="shrink-0 bg-chat-header pt-[env(safe-area-inset-top)] text-doc-paper">
        <div className="relative mx-auto flex h-[64px] max-w-[400px] items-center justify-center px-4">
          <Link to="/" aria-label="Πίσω" className="absolute left-3 grid h-10 w-10 place-items-center">
            <BackChevron className="h-[20px] w-[12px]" />
          </Link>
          <div className="flex items-center gap-2.5">
            <AssistantRobot className="h-10 w-10" />
            <h1 className="text-[22px] font-bold leading-none">
              mAi<span className="text-primary">gov</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[400px] flex-col gap-3 px-3 pb-6 pt-10" aria-live="polite">
          {messages.map((m) => (
            <p
              key={m.id}
              className={
                m.from === "bot"
                  ? "mr-6 self-start rounded-[4px] rounded-bl-none bg-chat-bubble px-4 py-3.5 text-[17px] leading-snug shadow-[0_6px_16px_-6px_var(--chat-shadow)]"
                  : "ml-10 self-end rounded-[4px] rounded-br-none bg-chat-action px-4 py-3 text-[16px] leading-snug text-doc-paper"
              }
            >
              {m.text}
            </p>
          ))}
          <Button
            type="button"
            onClick={restart}
            className="mt-[100px] h-[44px] self-center rounded-[4px] bg-chat-action px-6 text-[15px] font-bold text-doc-paper shadow-md hover:bg-chat-action/90"
          >
            Εκκίνηση νέας συνομιλίας
          </Button>
          <div ref={end} />
        </div>
      </main>

      <form onSubmit={send} className="shrink-0 px-3 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-2">
        <div className="mx-auto flex h-[60px] max-w-[376px] items-center gap-1 rounded-[6px] border border-chat-border bg-chat-bubble pl-2 pr-2">
          <Button type="button" variant="ghost" aria-label="Φωνητική εισαγωγή" onClick={() => input.current?.focus()} className="grid h-9 w-9 shrink-0 place-items-center p-0 text-chat-mic hover:bg-transparent hover:text-chat-mic [&_svg]:size-5">
            <Mic />
          </Button>
          <input
            ref={input}
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Γράψτε την ερώτησή σας"
            aria-label="Γράψτε την ερώτησή σας"
            enterKeyHint="send"
            className="min-w-0 flex-1 bg-transparent text-[17px] text-chat-ink outline-none placeholder:text-chat-muted"
          />
          <Button type="submit" aria-label="Αποστολή" disabled={!draft.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-chat-action p-0 text-doc-paper hover:bg-chat-action/90 disabled:bg-chat-send disabled:opacity-100 [&_svg]:size-5">
            <SendHorizontal />
          </Button>
        </div>
      </form>
    </div>
  );
}

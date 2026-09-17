"use client";

import { useEffect, useRef, useState } from "react";
import { ChatIcon, SendIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site } from "@/lib/site";

type Message = { from: "bot" | "user"; html: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    site.chat.intro.map((html) => ({ from: "bot", html }))
  );
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages, open]);

  function send() {
    const value = text.trim();
    if (!value) return;
    setText("");
    setMessages((m) => [...m, { from: "user", html: value }]);
    const reply = site.chat.replies[Math.floor(Math.random() * site.chat.replies.length)];
    window.setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", html: reply }]);
    }, 700);
  }

  return (
    <div className="no-print">
      <div
        className={`fixed right-4 bottom-24 z-40 flex h-[min(420px,70vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-tech/25 bg-[#0f1418]/95 shadow-2xl backdrop-blur-md transition md:right-6 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm font-medium">Chat with me</p>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
        <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
          {messages.map((msg, i) => (
            <div
              key={`${i}-${msg.from}`}
              className={`max-w-[90%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                msg.from === "bot"
                  ? "bg-tech/10 text-foreground/90"
                  : "ml-auto bg-gold/15 text-foreground"
              }`}
            >
              <p>
                {msg.html}{" "}
                {msg.from === "bot" && i === 1 ? (
                  <a className="text-tech underline" href={site.social.email}>
                    {site.email}
                  </a>
                ) : null}
              </p>
            </div>
          ))}
        </div>
        <form
          className="flex items-center gap-2 border-t border-white/10 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="h-9 bg-white/5"
            aria-label="Message"
          />
          <Button type="submit" size="icon" aria-label="Send">
            <SendIcon />
          </Button>
        </form>
      </div>

      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setUnread(false);
        }}
        className="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full border border-tech/30 bg-[#121820] text-tech shadow-[0_0_24px_rgb(168_201_209/0.25)] transition hover:scale-105"
        aria-label="Open chat"
      >
        <ChatIcon className="size-6" />
        {unread && !open ? (
          <span className="absolute top-2 right-2 size-2.5 rounded-full bg-teal" />
        ) : null}
      </button>
    </div>
  );
}

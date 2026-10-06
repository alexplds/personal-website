"use client";

import { useState } from "react";
import { content } from "@/lib/content";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(content.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="cta-pill cta-pill-ghost" onClick={copy}>
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

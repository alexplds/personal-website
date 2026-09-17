"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/button";

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
    <Button type="button" variant="outline" onClick={copy}>
      {copied ? "Copied" : "Copy email"}
    </Button>
  );
}

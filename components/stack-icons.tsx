import { BrainCircuit, Coffee, Network, type LucideIcon } from "lucide-react";
import { brandIcons } from "@/components/brand-icons";

const glyphIcons = {
  java: Coffee,
  rest: Network,
  llm: BrainCircuit,
} satisfies Record<string, LucideIcon>;

type GlyphId = keyof typeof glyphIcons;

export type StackIconId = keyof typeof brandIcons | GlyphId;

function isGlyph(id: StackIconId): id is GlyphId {
  return id in glyphIcons;
}

export function stackTone(id: StackIconId) {
  return isGlyph(id) ? null : brandIcons[id].hex;
}

export function StackIcon({ id }: { id: StackIconId }) {
  if (isGlyph(id)) {
    const Glyph = glyphIcons[id];
    return <Glyph aria-hidden="true" strokeWidth={1.75} />;
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={brandIcons[id].path} />
    </svg>
  );
}

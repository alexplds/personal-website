import { content } from "@/lib/content";

const gocourt = content.destinations.find((d) => d.id === "gocourt");

export function IntroCode() {
  return (
    <div className="intro-code hero-in hero-in-4">
      <p className="intro-code-file">alex.ts</p>
      <pre tabIndex={0} aria-label="A short introduction">
        <code>
          <span className="intro-kw">const</span>
          {" alex = {\n"}
          {"  "}
          <span className="intro-key intro-key-based">based</span>
          {": "}
          <span className="intro-str">&quot;{content.location}&quot;</span>
          {",\n"}
          {"  "}
          <span className="intro-key intro-key-desk">desk</span>
          {": "}
          <span className="intro-str">&quot;engineer / computer scientist&quot;</span>
          {",\n"}
          {"  "}
          <span className="intro-key intro-key-court">court</span>
          {": "}
          <span className="intro-str">&quot;lifelong athlete&quot;</span>
          {",\n"}
          {"  "}
          <span className="intro-key intro-key-mix">mix</span>
          {": "}
          <span className="intro-str">&quot;{gocourt?.title ?? "gocourt.gr"}&quot;</span>
          {",\n"}
          {"}; "}
          <span className="intro-cmt">{"// co-founded with a friend"}</span>
        </code>
      </pre>
    </div>
  );
}

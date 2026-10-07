import { content } from "@/lib/content";

const gocourt = content.destinations.find((d) => d.id === "gocourt");

export function IntroCode() {
  return (
    <div className="intro-code">
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
          <span className="intro-key intro-key-yellow">degree</span>
          {": "}
          <span className="intro-str">&quot;Mechanical and Electrical Engineering&quot;</span>
          {",\n"}
          {"  "}
          <span className="intro-key intro-key-yellow">experience</span>
          {": "}
          <span className="intro-str">&quot;Engineer at Firstco / control systems&quot;</span>
          {",\n"}
          {"  "}
          <span className="intro-key intro-key-yellow">passion</span>
          {": "}
          <span className="intro-str">&quot;Computer Science and Artificial Intelligence&quot;</span>
          {",\n"}
          {"  "}
          <span className="intro-key intro-key-court">hobby</span>
          {": "}
          <span className="intro-str">&quot;Sports&quot;</span>
          {",\n"}
          {"  "}
          <span className="intro-key intro-key-green">result</span>
          {": "}
          <span className="intro-str">&quot;{gocourt?.title ?? "GoCourt.gr"}&quot;</span>
          {" "}
          <span className="intro-cmt">{"// co-founded with a friend"}</span>
          {"\n};"}
        </code>
      </pre>
    </div>
  );
}

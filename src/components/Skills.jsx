import { skills, languages } from "../data/content.js";
import Reveal from "./Reveal.jsx";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="sec-num">02</span>
            <h2 className="sec-title">What I work with</h2>
            <p className="sec-note">
              Listed flat, without self-rated bars — every item here appears in something I built.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="skills panel">
            {skills.map((g) => (
              <div className="skill-row" key={g.group}>
                <div className="skill-g">{g.group}</div>
                <div className="skill-items">
                  {g.items.map((it) => <span className="skill-i" key={it}>{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginTop: 22, display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
            <span className="mono muted">Languages</span>
            <span style={{ fontSize: "0.9rem", color: "var(--ink-2)" }}>{languages.join(" · ")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

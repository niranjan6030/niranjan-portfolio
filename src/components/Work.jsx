import { projects } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import Tilt from "./Tilt.jsx";
import { GitHub } from "./icons.jsx";

function Project({ p, i }) {
  return (
    <Tilt>
      <article className="proj panel" id={p.id}>
        <div className="proj-top">
          <div>
            <div className="proj-idx">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="proj-name">{p.name}</h3>
            <div className="proj-tag">{p.tagline}</div>
          </div>
          <div className="proj-meta">{p.period}<br />{p.role}</div>
        </div>

        <p className="proj-problem">{p.problem}</p>

        <div className="stack">
          {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
        </div>

        <div className="points">
          {p.points.map((pt) => (
            <div key={pt.h}>
              <div className="point-h">{pt.h}</div>
              <p className="point-d">{pt.d}</p>
            </div>
          ))}
        </div>

        <div className="proj-links">
          <a className="btn btn-ghost btn-sm" href={p.repo} target="_blank" rel="noreferrer">
            <GitHub /> Source
          </a>
        </div>
      </article>
    </Tilt>
  );
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="sec-num">01</span>
            <h2 className="sec-title">Selected work</h2>
            <p className="sec-note">Four projects, all shipped.</p>
          </div>
        </Reveal>

        <div className="proj-grid">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <Project p={p} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

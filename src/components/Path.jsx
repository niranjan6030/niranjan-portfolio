import { timeline, certifications } from "../data/content.js";
import Reveal from "./Reveal.jsx";

export default function Path() {
  return (
    <section className="section" id="path">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="sec-num">03</span>
            <h2 className="sec-title">Education, experience &amp; leadership</h2>
          </div>
        </Reveal>

        <div className="tl">
          {timeline.map((t, i) => (
            <Reveal key={t.org} delay={i * 60}>
              <div className="tl-item panel">
                <div className="tl-when">
                  <span className="tl-kind mono">{t.kind}</span>
                  {t.period}
                </div>
                <div>
                  <div className="tl-org">{t.org}</div>
                  <div className="tl-title">{t.title} · {t.place}</div>
                  <p className="tl-detail">{t.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mono muted" style={{ marginTop: 44, marginBottom: 0 }}>Certifications</div>
          <div className="certs">
            {certifications.map((c) => (
              <div className="cert panel" key={c.name}>
                <div className="cert-n">{c.name}</div>
                <div className="cert-i">{c.issuer}{c.year ? ` · ${c.year}` : ""}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

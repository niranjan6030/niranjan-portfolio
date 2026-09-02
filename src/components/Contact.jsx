import { profile } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import { Download, Mail, ArrowUpRight } from "./icons.jsx";

export default function Contact() {
  const rows = [
    { k: "Email", v: profile.email, href: `mailto:${profile.email}`, a: "Write to me" },
    { k: "Phone", v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, a: "Call" },
    { k: "LinkedIn", v: "in/niranjan-s-8b9283306", href: profile.linkedin, a: "Open profile" },
    { k: "GitHub", v: "github.com/niranjan6030", href: profile.github, a: "See the code" },
  ];

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="sec-num">04</span>
            <h2 className="sec-title">Get in touch</h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="cta-box panel">
            <div>
              <h3 className="cta-h">Hiring for a data role?</h3>
              <p className="cta-p">
                The résumé is one page and covers the same four projects in detail — the models,
                the validation and the SQL behind each of them. Take it with you.
              </p>
            </div>
            <div className="cta-actions">
              <a className="btn" href={profile.resume} download>
                <Download /> Download résumé
              </a>
              <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
                <ArrowUpRight /> View in browser
              </a>
              <span className="resume-note">PDF · one page · updated Sep 2026</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="contact-rows">
            {rows.map((r) => (
              <a className="crow" key={r.k} href={r.href}
                 target={r.href.startsWith("http") ? "_blank" : undefined}
                 rel={r.href.startsWith("http") ? "noreferrer" : undefined}>
                <span className="crow-k">{r.k}</span>
                <span className="crow-v">{r.v}</span>
                <span className="crow-a">{r.a} →</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

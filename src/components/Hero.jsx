import { profile } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import { Download, Mail, ArrowUpRight } from "./icons.jsx";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-in">
        <Reveal>
          <p className="hero-kicker">Bengaluru · BCA at CHRIST · 2027</p>
          <h1 className="hero-name">{profile.name}</h1>
          <div className="hero-role">{profile.role}</div>
          <p className="hero-lede">{profile.lede}</p>

          <div className="hero-cta">
            <a className="btn" href={profile.resume} download>
              <Download /> Download résumé
            </a>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
              <Mail /> Get in touch
            </a>
          </div>

          <div className="hero-meta">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
          </div>
        </Reveal>
      </div>
      <div className="hero-scroll" aria-hidden="true"><span /></div>
    </header>
  );
}

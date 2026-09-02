import { useEffect, useState } from "react";
import { profile } from "../data/content.js";
import { Download, Sun, Moon } from "./icons.jsx";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "path", label: "Path" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ theme, onTheme, onPalette }) {
  const [stuck, setStuck] = useState(false);
  const [prog, setProg] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 8);
      const h = document.body.scrollHeight - window.innerHeight;
      setProg(h > 0 ? Math.min(1, y / h) : 0);

      let cur = "";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) cur = l.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${stuck ? " stuck" : ""}`}>
      <div className="nav-in">
        <a className="brand" href="#top">
          <span className="brand-name">{profile.name}</span>
          <span className="brand-role">{profile.role}</span>
        </a>

        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.id} className="nav-link" href={`#${l.id}`} data-active={active === l.id}>
              {l.label}
            </a>
          ))}
        </div>

        <button className="pal-btn" onClick={onPalette} aria-label="Open command palette">
          Search <kbd>⌘K</kbd>
        </button>

        <button className="tgl" onClick={onTheme}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>

        <a className="btn btn-sm" href={profile.resume} download>
          <Download /> Résumé
        </a>
      </div>
      <div className="nav-prog" style={{ width: `${prog * 100}%` }} />
    </nav>
  );
}

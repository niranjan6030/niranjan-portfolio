import { useEffect, useMemo, useRef, useState } from "react";
import { profile, projects } from "../data/content.js";

/* ⌘K / Ctrl-K. Jump anywhere, grab the résumé, copy the email. */

export default function Palette({ open, setOpen, theme, onTheme }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const go = (id) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const actions = useMemo(() => [
    { g: "Résumé", label: "Download résumé (PDF)", hint: "one page", keys: "cv download pdf hire", run: () => { window.location.href = profile.resume; setOpen(false); } },
    { g: "Résumé", label: "Open résumé in a new tab", keys: "cv view pdf", run: () => { window.open(profile.resume, "_blank", "noreferrer"); setOpen(false); } },
    { g: "Contact", label: `Email — ${profile.email}`, run: () => { window.location.href = `mailto:${profile.email}`; setOpen(false); } },
    {
      g: "Contact", label: "Copy email address", hint: copied ? "copied" : "",
      run: async () => {
        try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1500); }
        catch { /* clipboard blocked */ }
      },
    },
    { g: "Contact", label: "Open LinkedIn", run: () => { window.open(profile.linkedin, "_blank", "noreferrer"); setOpen(false); } },
    { g: "Contact", label: "Open GitHub", run: () => { window.open(profile.github, "_blank", "noreferrer"); setOpen(false); } },
    { g: "Go to", label: "Selected work", keys: "projects portfolio case studies", run: go("work") },
    { g: "Go to", label: "Skills", run: go("skills") },
    { g: "Go to", label: "Education & experience", run: go("path") },
    { g: "Go to", label: "Get in touch", run: go("contact") },
    ...projects.map((p) => ({ g: "Projects", label: p.name, hint: p.tagline, run: go(p.id) })),
    ...projects.map((p) => ({ g: "Projects", label: `${p.name} — source on GitHub`, run: () => { window.open(p.repo, "_blank", "noreferrer"); setOpen(false); } })),
    { g: "View", label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme", run: () => { onTheme(); setOpen(false); } },
    { g: "View", label: "Print this page", run: () => { setOpen(false); setTimeout(() => window.print(), 120); } },
  ], [theme, onTheme, copied, setOpen]);

  // "resume" has to match "résumé" — fold accents on both sides before comparing
  const fold = (t) =>
    t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const hits = useMemo(() => {
    const s = fold(q.trim());
    if (!s) return actions;
    return actions.filter((a) =>
      fold(`${a.label} ${a.g} ${a.hint || ""} ${a.keys || ""}`).includes(s)
    );
  }, [q, actions]);

  useEffect(() => { setI(0); }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
      if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(hits.length - 1, v + 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(0, v - 1)); }
      if (e.key === "Enter") { e.preventDefault(); hits[i]?.run(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hits, i, setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  let lastGroup = null;

  return (
    <div className="pal-veil" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={inputRef}
          className="pal-input"
          placeholder="Search — résumé, projects, contact…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="pal-list">
          {hits.length === 0 && <div className="pal-empty">Nothing matches “{q}”.</div>}
          {hits.map((a, n) => {
            const head = a.g !== lastGroup ? (lastGroup = a.g) : null;
            return (
              <div key={a.label + n}>
                {head && <div className="pal-group">{head}</div>}
                <button
                  className="pal-item"
                  data-on={n === i}
                  onMouseEnter={() => setI(n)}
                  onClick={() => a.run()}
                >
                  <span>{a.label}</span>
                  {a.hint && <span className="pal-hint">{a.hint}</span>}
                </button>
              </div>
            );
          })}
        </div>
        <div className="pal-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

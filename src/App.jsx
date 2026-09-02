import { useEffect, useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import Skills from "./components/Skills.jsx";
import Path from "./components/Path.jsx";
import Contact from "./components/Contact.jsx";
import Palette from "./components/Palette.jsx";
import Scene from "./components/Scene.jsx";
import { profile } from "./data/content.js";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [palOpen, setPalOpen] = useState(false);

  useEffect(() => {
    const saved = (() => {
      try { return localStorage.getItem("theme"); } catch { return null; }
    })();
    setTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch { /* private mode */ }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <Scene />
      <Nav theme={theme} onTheme={toggleTheme} onPalette={() => setPalOpen(true)} />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Path />
        <Contact />
      </main>
      <footer className="foot">
        <div className="wrap foot-in">
          <span className="foot-txt">© {new Date().getFullYear()} {profile.name}</span>
          <span className="foot-txt">Bengaluru, India</span>
          <span className="foot-txt foot-spacer">
            React · WebGL · type set in IBM Plex
          </span>
        </div>
      </footer>
      <Palette open={palOpen} setOpen={setPalOpen} theme={theme} onTheme={toggleTheme} />
    </>
  );
}

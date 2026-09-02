import { useEffect, useRef } from "react";

/*  One persistent WebGL scene behind the whole document.
 *
 *  The page does not scroll past the scene — the camera travels through it.
 *  A single structured point field re-forms as you move down the page, one
 *  formation per section, and everything is driven by scroll position and
 *  pointer, never by a timer running on its own.
 *
 *  Content stays real HTML on top: selectable, searchable, printable.
 */

const COUNT = 2600;

/* --- formations. each returns [x,y,z] for point i of n ------------------- */
const FORMS = {
  lattice(i, n) {
    const per = Math.round(Math.sqrt(n));
    const x = (i % per) / (per - 1) - 0.5;
    const z = Math.floor(i / per) / (per - 1) - 0.5;
    return [x * 46, Math.sin(x * 7) * Math.cos(z * 6) * 1.4, z * 46];
  },
  wave(i, n) {
    const per = Math.round(Math.sqrt(n));
    const u = (i % per) / (per - 1), v = Math.floor(i / per) / (per - 1);
    const x = (u - 0.5) * 46, z = (v - 0.5) * 46;
    return [x, Math.sin(u * 9) * 3.4 + Math.cos(v * 6) * 2.2, z];
  },
  helix(i, n) {
    const t = i / n;
    const turns = 5, r = 12 + Math.sin(t * Math.PI) * 4;
    const a = t * Math.PI * 2 * turns + (i % 2) * Math.PI;
    return [Math.cos(a) * r, (t - 0.5) * 42, Math.sin(a) * r];
  },
  sphere(i, n) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 17;
    return [Math.cos(theta) * Math.sin(phi) * r, Math.cos(phi) * r, Math.sin(theta) * Math.sin(phi) * r];
  },
  column(i, n) {
    const t = i / n;
    const rings = 26, per = Math.ceil(n / rings);
    const ring = Math.floor(i / per), a = ((i % per) / per) * Math.PI * 2;
    const r = 9 + Math.sin(ring * 0.7) * 2.6;
    return [Math.cos(a) * r, (ring / rings - 0.5) * 40, Math.sin(a) * r];
  },
  converge(i, n) {
    const t = i / n;
    const a = t * Math.PI * 2 * 9;
    const r = Math.pow(1 - t, 1.7) * 22;
    return [Math.cos(a) * r, (t - 0.5) * 10, Math.sin(a) * r];
  },
};

const ORDER = ["lattice", "wave", "helix", "column", "sphere", "converge"];

export default function Scene() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let stop = false;
    let cleanup = () => {};

    (async () => {
      let THREE;
      try { THREE = await import("three"); } catch { return; }
      if (stop) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cssVar = (n, f) =>
        getComputedStyle(document.documentElement).getPropertyValue(n).trim() || f;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 260);

      /* ---- precompute every formation ---------------------------------- */
      const forms = ORDER.map((k) => {
        const arr = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
          const [x, y, z] = FORMS[k](i, COUNT);
          arr[i * 3] = x; arr[i * 3 + 1] = y; arr[i * 3 + 2] = z;
        }
        return arr;
      });

      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(forms[0]);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

      // a minority of points carry the accent, so the field has structure
      const accentMask = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) accentMask[i] = i % 11 === 0 ? 1 : 0;
      const colors = new Float32Array(COUNT * 3);
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const paintColours = () => {
        const ink = new THREE.Color(cssVar("--ink", "#14150F"));
        const accent = new THREE.Color(cssVar("--teal", "#12605F"));
        for (let i = 0; i < COUNT; i++) {
          const c = accentMask[i] ? accent : ink;
          colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
        }
        geo.attributes.color.needsUpdate = true;
      };
      paintColours();

      const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";
      const mat = new THREE.PointsMaterial({
        size: 0.135, sizeAttenuation: true, vertexColors: true,
        transparent: true, opacity: isDark() ? 0.5 : 0.34, depthWrite: false,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      /* ---- a few wireframe rings for depth ------------------------------ */
      const rings = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const r = new THREE.Mesh(
          new THREE.TorusGeometry(20 + i * 7, 0.035, 6, 120),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(cssVar("--rule", "#DFDCD2")),
            transparent: true, opacity: 0.5,
          })
        );
        r.rotation.x = Math.PI / 2 + i * 0.16;
        r.rotation.z = i * 0.5;
        rings.add(r);
      }
      scene.add(rings);

      scene.fog = new THREE.FogExp2(new THREE.Color(cssVar("--paper", "#FBFAF7")), 0.019);

      /* ---- scroll + pointer state --------------------------------------- */
      let scrollT = 0, targetScrollT = 0;
      let px = 0, py = 0, tpx = 0, tpy = 0;

      const onScroll = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        targetScrollT = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      };
      const onPointer = (e) => {
        tpx = (e.clientX / window.innerWidth - 0.5) * 2;
        tpy = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("pointermove", onPointer, { passive: true });

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        onScroll();
      };
      window.addEventListener("resize", onResize);

      const themeObs = new MutationObserver(() => {
        paintColours();
        mat.opacity = isDark() ? 0.5 : 0.34;
        scene.fog.color = new THREE.Color(cssVar("--paper", "#FBFAF7"));
        rings.children.forEach((r) => {
          r.material.color = new THREE.Color(cssVar("--rule", "#DFDCD2"));
        });
      });
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      /* ---- morph + render ----------------------------------------------- */
      const smooth = (a, b, k) => a + (b - a) * k;
      let raf = 0;

      const frame = () => {
        if (stop) return;
        scrollT = smooth(scrollT, targetScrollT, reduce ? 1 : 0.075);
        px = smooth(px, tpx, 0.05);
        py = smooth(py, tpy, 0.05);

        // which two formations are we between?
        const segs = forms.length - 1;
        const f = Math.min(segs - 0.0001, scrollT * segs);
        const i0 = Math.floor(f);
        const k = f - i0;
        const ease = k * k * (3 - 2 * k);           // smoothstep
        const a = forms[i0], b = forms[i0 + 1];

        for (let i = 0; i < COUNT * 3; i++) pos[i] = a[i] + (b[i] - a[i]) * ease;
        geo.attributes.position.needsUpdate = true;

        // the camera travels through the field rather than the page scrolling past it
        const spin = scrollT * Math.PI * 1.15;
        const radius = 44 - scrollT * 13;
        camera.position.set(
          Math.sin(spin) * radius + px * 3.4,
          10 - scrollT * 15 - py * 2.6,
          Math.cos(spin) * radius
        );
        camera.lookAt(0, (0.5 - scrollT) * 5, 0);

        points.rotation.y = scrollT * 0.55;
        rings.rotation.y = -scrollT * 0.9;
        rings.rotation.x = scrollT * 0.35;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };
      frame();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", onResize);
        themeObs.disconnect();
        geo.dispose(); mat.dispose();
        rings.children.forEach((r) => { r.geometry.dispose(); r.material.dispose(); });
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    })();

    return () => { stop = true; cleanup(); };
  }, []);

  return <div className="scene" ref={hostRef} aria-hidden="true" />;
}

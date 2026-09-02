# Niranjan S — portfolio

A data-analyst portfolio. React + Vite, plain JavaScript, no UI framework and no
component library — the only runtime dependencies are React and Three.js.

Live: https://niranjan-sportfolio.vercel.app

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

Node 18 or newer.

## Where things live

```
public/Niranjan_S_Resume.pdf   the file every Download button serves
src/data/content.js            ALL copy and data — edit this, not the components
src/styles.css                 the whole design system (CSS custom properties)
src/components/                sections, the scene and the palette
```

**To update anything on the page, edit `src/data/content.js`.** Projects, skills,
timeline, certifications and contact details all come from that one file. The
components read it and lay it out; none of them hard-code content.

**To update the résumé,** drop a new PDF at `public/Niranjan_S_Resume.pdf` with the
same filename. Every download link picks it up with no code change.

## The spatial layer

`src/components/Scene.jsx` — one persistent WebGL scene fixed behind the entire
document. The page does not scroll past it: scroll position drives a camera that
travels through the field, and a structured 2,600-point cloud re-forms between six
formations (lattice → wave → helix → column → sphere → converge) as you move down.
Pointer position adds parallax. Nothing runs on a timer — every motion is a function
of scroll and pointer, so the scene is still when the visitor is.

Content stays real HTML on top at `z-index: 2`: selectable, searchable, printable and
readable by a screen reader. Panels are **opaque, not frosted** — fourteen
`backdrop-filter` panels over an animating canvas re-composite the blur every frame and
cost real frames on a mid-range phone; the depth comes from border and shadow instead.

`src/components/Tilt.jsx` leans a panel toward the pointer in 3D. It disables itself on
coarse pointers and under `prefers-reduced-motion`, where it is only noise.

## Command palette

⌘K / Ctrl-K anywhere on the page. Jumps to any section or project, downloads or opens the
résumé, copies the email, opens LinkedIn/GitHub, toggles the theme, triggers print.
Search folds accents, so "resume" matches "résumé".

## Theming

Light and dark are both defined as CSS custom properties on `:root` and
`[data-theme="dark"]` in `src/styles.css`. The toggle writes to `localStorage` and
falls back to the system preference. To change the palette, edit the variables at
the top of that file — nothing else references raw colours.

## Deploying

Any static host — the build is a folder of files with no server and no environment
variables. On Vercel or Netlify: build command `npm run build`, output directory
`dist`.

Three.js is the bulk of the bundle (~188 kB gzipped) and it loads on every page
because the scene is site-wide. Text and layout paint first; the field fades in
after.

## Accessibility notes

- Respects `prefers-reduced-motion` — scroll reveals, the scene's easing, the panel
  tilt and the scroll indicator all switch off.
- The 3D scene is `aria-hidden` and purely decorative; nothing is communicated by it
  alone.
- Body text is ~16.8:1 against its background in both themes.
- Skip link to the work section.
- `:focus-visible` rings on every interactive element, and the palette is fully
  keyboard-driven.
- A print stylesheet turns the page into a clean document (chrome, editors and
  controls are dropped).

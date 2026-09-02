const base = {
  className: "icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Download = () => (
  <svg {...base}><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M4 21h16" /></svg>
);
export const Mail = () => (
  <svg {...base}><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3 6 9 6.5L21 6" /></svg>
);
export const ArrowUpRight = () => (
  <svg {...base}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
);
export const GitHub = () => (
  <svg {...base}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>
);
export const LinkedIn = () => (
  <svg {...base}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7" /><path d="M7 7v.01" /><path d="M11 17v-4a2 2 0 0 1 4 0v4" /><path d="M11 10v7" /></svg>
);
export const Sun = () => (
  <svg {...base} width="16" height="16"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></svg>
);
export const Moon = () => (
  <svg {...base} width="16" height="16"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);

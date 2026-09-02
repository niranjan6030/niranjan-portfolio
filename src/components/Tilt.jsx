import { useRef } from "react";

/* Gives a panel real depth: it leans toward the pointer in 3D.
   Disabled for reduced-motion and on coarse pointers, where it is only noise. */
export default function Tilt({ children, max = 5 }) {
  const ref = useRef(null);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform =
      `perspective(1100px) rotateX(${(-dy * max).toFixed(2)}deg) rotateY(${(dx * max).toFixed(2)}deg) translateZ(6px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div className="tilt" ref={ref} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  );
}

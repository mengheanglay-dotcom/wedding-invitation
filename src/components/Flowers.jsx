import { useEffect, useRef } from "react";

const PALETTES = [
  ["#f4a7b9", "#f9c8d4"],
  ["#e8b4c8", "#f5d0de"],
  ["#f7c5d0", "#fde2e8"],
  ["#e0a0b8", "#f2c0d0"],
  ["#f2b3c6", "#fac8d8"],
  ["#d9a0bc", "#eec4d4"],
];

const SHAPES = [
  (f1, f2) => `<svg viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="20" rx="10" ry="18" fill="${f1}" transform="rotate(20 20 20)"/>
      <ellipse cx="20" cy="20" rx="8" ry="14" fill="${f2}" opacity=".85" transform="rotate(-15 20 20)"/>
      <circle cx="20" cy="20" r="2.2" fill="#f9a8c0"/>
    </svg>`,

  (f1, f2) => `<svg viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="20" rx="11" ry="19" fill="${f1}" transform="rotate(5 20 20)"/>
      <ellipse cx="20" cy="20" rx="9" ry="15" fill="${f2}" opacity=".85" transform="rotate(-25 20 20)"/>
      <circle cx="20" cy="20" r="2" fill="#fbb8cc"/>
    </svg>`,

  (f1, f2) => `<svg viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="20" rx="9" ry="17" fill="${f1}" transform="rotate(30 20 20)"/>
      <ellipse cx="20" cy="20" rx="7" ry="13" fill="${f2}" opacity=".85" transform="rotate(-10 20 20)"/>
      <circle cx="20" cy="20" r="1.8" fill="#f9a8c0"/>
    </svg>`,

  (f1, f2) => `<svg viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="20" rx="12" ry="18" fill="${f1}" transform="rotate(45 20 20)"/>
      <ellipse cx="20" cy="20" rx="10" ry="15" fill="${f2}" opacity=".8"/>
      <circle cx="20" cy="20" r="2.5" fill="#f2b8c6"/>
    </svg>`,

  (f1, f2) => `<svg viewBox="0 0 40 40" fill="none">
      <path d="M20 4 C26 10 34 14 34 22 C34 30 27 36 20 36 C13 36 6 30 6 22 C6 14 14 10 20 4Z" fill="${f1}"/>
      <path d="M20 8 C25 13 30 16 30 22 C30 28 25 33 20 33 C15 33 10 28 10 22 C10 16 15 13 20 8Z" fill="${f2}" opacity=".7"/>
      <circle cx="20" cy="20" r="2.5" fill="#f9a8c0"/>
    </svg>`
];

const css = `
@keyframes petalFall {
  0% { transform: translateY(-40px) rotate(0deg); opacity:0; }
  5% { opacity:1; }
  90% { opacity:0.9; }
  100% { transform: translateY(110vh) rotate(720deg); opacity:0; }
}

@keyframes petalSway {
  0%,100% { margin-left:0; }
  30% { margin-left:22px; }
  70% { margin-left:-16px; }
}
`;

export default function Flowers() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const isMobile = window.innerWidth < 480;
    const COUNT = isMobile ? 28 : 42;

    root.innerHTML = "";

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("div");

      const pal = PALETTES[i % PALETTES.length];
      const size = 14 + (i % 6) * 3.5;
      const fallDur = 6 + (i % 7) * 1.3;
      const swayDur = 2.5 + (i % 5) * 0.7;
      const delay = (i * 0.55) % 13;
      const left = (i * 4.3 + 1.5) % 97;
      const opacity = 0.55 + (i % 4) * 0.12;

      el.style.cssText = `
        position: fixed;
        top: -30px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        pointer-events: none;
        will-change: transform;
        z-index: 9999;
        filter: drop-shadow(0 2px 6px rgba(190,90,120,0.25));
        animation:
          petalFall ${fallDur}s -${delay}s infinite linear,
          petalSway ${swayDur}s -${delay * 0.7}s infinite ease-in-out;
      `;

      el.innerHTML = SHAPES[i % SHAPES.length](pal[0], pal[1]);

      root.appendChild(el);
    }
  }, []);

  return (
    <>
      <style>{css}</style>

      <div
        ref={rootRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 9999
        }}
      />
    </>
  );
}
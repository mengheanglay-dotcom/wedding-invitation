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
  (f1, f2) => `<svg viewBox="0 0 40 40">
    <ellipse cx="20" cy="20" rx="10" ry="18" fill="${f1}" transform="rotate(20 20 20)"/>
    <ellipse cx="20" cy="20" rx="8" ry="14" fill="${f2}" opacity=".85" transform="rotate(-15 20 20)"/>
    <circle cx="20" cy="20" r="2" fill="#f9a8c0"/>
  </svg>`,

  (f1, f2) => `<svg viewBox="0 0 40 40">
    <ellipse cx="20" cy="20" rx="11" ry="19" fill="${f1}" transform="rotate(5 20 20)"/>
    <ellipse cx="20" cy="20" rx="9" ry="15" fill="${f2}" opacity=".85" transform="rotate(-25 20 20)"/>
    <circle cx="20" cy="20" r="2" fill="#fbb8cc"/>
  </svg>`,

  (f1, f2) => `<svg viewBox="0 0 40 40">
    <ellipse cx="20" cy="20" rx="9" ry="17" fill="${f1}" transform="rotate(30 20 20)"/>
    <ellipse cx="20" cy="20" rx="7" ry="13" fill="${f2}" opacity=".85" transform="rotate(-10 20 20)"/>
    <circle cx="20" cy="20" r="1.8" fill="#f9a8c0"/>
  </svg>`,

  (f1, f2) => `<svg viewBox="0 0 40 40">
    <ellipse cx="20" cy="20" rx="12" ry="18" fill="${f1}" transform="rotate(45 20 20)"/>
    <ellipse cx="20" cy="20" rx="10" ry="15" fill="${f2}" opacity=".8"/>
    <circle cx="20" cy="20" r="2.5" fill="#f2b8c6"/>
  </svg>`
];

const css = `
@keyframes petalFall {
  0% {
    transform: translate3d(0,-40px,0) rotate(0deg);
    opacity:0;
  }
  5% { opacity:1; }
  100% {
    transform: translate3d(0,110vh,0) rotate(720deg);
    opacity:0;
  }
}

@keyframes petalSway {
  0%,100% { transform: translateX(0); }
  50% { transform: translateX(20px); }
}
`;

export default function Flowers() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const isMobile = window.innerWidth < 480;

    // reduced count = smoother scroll
    const COUNT = isMobile ? 10 : 16;

    root.innerHTML = "";

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("div");

      const pal = PALETTES[i % PALETTES.length];
      const size = 16 + Math.random() * 12;
      const fallDur = 8 + Math.random() * 6;
      const swayDur = 3 + Math.random() * 2;
      const delay = Math.random() * 10;
      const left = Math.random() * 100;
      const opacity = 0.6 + Math.random() * 0.3;

      el.style.cssText = `
        position: fixed;
        top: -40px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        pointer-events: none;
        z-index: 5;
        will-change: transform;
        transform: translate3d(0,0,0);
        animation:
          petalFall ${fallDur}s ${delay}s linear infinite,
          petalSway ${swayDur}s ${delay}s ease-in-out infinite alternate;
      `;

      el.innerHTML = SHAPES[i % SHAPES.length](pal[0], pal[1]);

      root.appendChild(el);
    }

    return () => {
      root.innerHTML = "";
    };
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
          zIndex: 5
        }}
      />
    </>
  );
}
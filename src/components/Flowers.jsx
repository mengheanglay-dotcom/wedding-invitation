import { useEffect, useRef } from "react";

const COLORS = ["#f4a7b9", "#f9c8d4", "#f7c5d0", "#f2b3c6"];

const css = `
@keyframes fall {
  0% {
    transform: translate3d(0,-40px,0) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: 1; }
  100% {
    transform: translate3d(20px,110vh,0) rotate(360deg);
    opacity: 0;
  }
}
`;

export default function Flowers() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const isMobile = window.innerWidth < 480;
    const COUNT = isMobile ? 4 : 8;

    root.innerHTML = "";

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("div");

      const size = 10 + Math.random() * 8;
      const left = Math.random() * 100;
      const duration = 14 + Math.random() * 6;
      const delay = Math.random() * 6;

      el.style.cssText = `
        position:absolute;
        top:0;
        left:${left}%;
        width:${size}px;
        height:${size}px;
        background:${COLORS[i % COLORS.length]};
        border-radius:50% 50% 50% 0;
        opacity:.8;
        pointer-events:none;

        transform:translate3d(0,0,0);
        animation:fall ${duration}s ${delay}s linear infinite;
      `;

      root.appendChild(el);
    }

    // 🔥 pause during scroll (fix glitch)
    let timeout;
    const onScroll = () => {
      const items = root.children;

      for (let el of items) {
        el.style.animationPlayState = "paused";
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        for (let el of items) {
          el.style.animationPlayState = "running";
        }
      }, 120);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      root.innerHTML = "";
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <div
        ref={ref}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",

          // 🔥 CRITICAL FIX
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",

          zIndex: 1,
        }}
      />
    </>
  );
}
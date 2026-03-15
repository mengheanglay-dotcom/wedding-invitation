import { useEffect, useRef } from "react";

const COUPLE_BG = "/src/assets/IMG_0166.JPEG";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    // fewer petals = smoother
    const PETAL_COUNT = window.innerWidth < 480 ? 10 : 14;

    const petals = Array.from({ length: PETAL_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: 5 + Math.random() * 5,
      speed: 0.6 + Math.random() * 0.8,
      swing: Math.random() * 1.2 - 0.6,
      angle: Math.random() * Math.PI * 2,
      rot: Math.random() * 0.02 - 0.01,
      alpha: 0.5 + Math.random() * 0.4,
      hue: 340 + Math.random() * 20,
    }));

    let raf;
    let last = 0;

    const draw = (t) => {
      // limit FPS to ~40
      if (t - last < 25) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = t;

      ctx.clearRect(0, 0, W, H);

      for (let p of petals) {
        p.y += p.speed;
        p.x += Math.sin(p.y / 60) * p.swing;
        p.angle += p.rot;

        if (p.y > H + 20) {
          p.y = -20;
          p.x = Math.random() * W;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 1.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue},70%,82%)`;
        ctx.fill();

        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="hero">
      <img
        className="hero-photo"
        src={COUPLE_BG}
        alt="Couple"
        loading="eager"
      />

      <canvas ref={canvasRef} className="hero-canvas" />

      {/* rest of your JSX stays exactly the same */}
    </div>
  );
}
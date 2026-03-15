import { useEffect, useRef } from "react";

const COUPLE_BG = "/src/assets/IMG_0166.JPEG";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const petals = Array.from({ length: 22 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: 5 + Math.random() * 7,
      speed: 0.6 + Math.random() * 1.2,
      swing: Math.random() * 2 - 1,
      angle: Math.random() * Math.PI * 2,
      rot: Math.random() * 0.04 - 0.02,
      alpha: 0.4 + Math.random() * 0.5,
      hue: 340 + Math.random() * 20,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      petals.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.y / 40) * p.swing;
        p.angle += p.rot;
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 1.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue},70%,82%)`;
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Moul&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Battambang:wght@300;400;700&display=swap');

        * { box-sizing:border-box; margin:0; padding:0; }

        .hero {
          position: relative;
          width: 100%;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
        }

        .hero-photo {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          z-index: 0;
        }

        .hero-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          z-index: 2; pointer-events: none;
        }

        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            180deg,
            rgba(10,5,0,.68) 0%,
            rgba(10,5,0,.08) 28%,
            rgba(10,5,0,.05) 58%,
            rgba(10,5,0,.78) 100%
          );
        }

        .frame-outer { position:absolute; inset:10px; border:1px solid rgba(201,169,110,.5); z-index:3; pointer-events:none; }
        .frame-inner { position:absolute; inset:17px; border:.5px solid rgba(201,169,110,.22); z-index:3; pointer-events:none; }

        .floral { position:absolute; z-index:4; pointer-events:none; width:clamp(70px,15vw,105px); height:clamp(70px,15vw,105px); opacity:.65; }
        .fl-tl { top:0; left:0; }
        .fl-tr { top:0; right:0; transform:scaleX(-1); }
        .fl-bl { bottom:0; left:0; transform:scaleY(-1); }
        .fl-br { bottom:0; right:0; transform:scale(-1,-1); }

        .hero-top {
          position: relative; z-index: 5;
          width: 100%; text-align: center;
          padding: 48px 28px 0;
        }

        .butterfly-row {
          display: flex; justify-content: center; gap: 14px;
          margin-bottom: 10px;
          animation: fadeDown .6s ease both;
        }

        .top-label {
          font-family: 'Battambang', serif;
          font-size: clamp(.7rem, 2.6vw, .85rem);
          font-weight: 300;
          color: rgba(255,225,150,.75);
          letter-spacing: .28em;
          text-transform: uppercase;
          margin-bottom: 6px;
          animation: fadeDown .65s ease both .08s;
          opacity: 0;
        }

        .title-main {
          font-family: 'Moul', serif;
          font-size: clamp(1.85rem, 6.5vw, 2.2rem);
          line-height: 1.8;
          margin: 0;
          background: linear-gradient(175deg,
            #fffbe0 0%, #fce97a 12%, #e8b020 26%,
            #fff0a0 40%, #c9860a 54%, #fce060 66%,
            #a06808 78%, #ffe88a 88%, #fffbe0 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter:
            drop-shadow(0 0 10px rgba(255,210,60,.6))
            drop-shadow(0 2px 3px rgba(80,40,0,.6));
          animation: fadeDown .75s ease both .12s, goldShimmer 3.5s ease-in-out infinite 1s;
          opacity: 0;
        }

        .title-ornament {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin: 10px auto 4px; max-width: 260px;
          animation: fadeDown .7s ease both .2s; opacity: 0;
        }
        .orn-line   { flex:1; height:.5px; background:linear-gradient(90deg,transparent,rgba(201,169,110,.8)); }
        .orn-line.r { background:linear-gradient(90deg,rgba(201,169,110,.8),transparent); }
        .orn-gem    { width:5px; height:5px; background:#c9a96e; transform:rotate(45deg); flex-shrink:0; }
        .orn-star   { font-size:13px; color:#c9a96e; font-family:serif; flex-shrink:0; }

        .title-reflection {
          font-family: 'Moul', serif;
          font-size: clamp(.45rem, 2vw, .6rem);
          letter-spacing: .06em;
          display: block;
          margin-top: 0;
          transform: scaleY(-1);
          background: linear-gradient(180deg, rgba(201,169,110,.45) 0%, transparent 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeDown .75s ease both .25s;
          opacity: 0;
          pointer-events: none; user-select: none;
        }

        .hero-bottom {
          position: relative; z-index: 5;
          width: 100%; text-align: center;
          padding: 0 28px 52px;
        }

        .names-block {
          animation: fadeUp .9s ease both .4s;
          opacity: 0;
        }

        .sub-invite {
          font-family: 'Battambang', serif;
          font-size: clamp(.7rem, 2.6vw, .84rem);
          font-weight: 300;
          color: rgba(255,225,150,.7);
          letter-spacing: .1em;
          margin: 0 0 10px;
        }

        /* ── NAMES — with text shadow for clarity ── */
        .name-kh {
          font-family: 'Moul', serif;
          font-size: clamp(1.3rem, 5.8vw, 1.85rem);
          line-height: 1.45;
          margin: 0;
          background: linear-gradient(175deg,
            #fffbe0 0%, #fce060 25%, #c9860a 50%, #fce060 75%, #fffbe0 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;

          /* ── shadow behind each name for legibility ── */
          filter:
            drop-shadow(0 0 12px rgba(0, 0, 0, 0.9))
            drop-shadow(0 2px 16px rgba(0, 0, 0, 0.85))
            drop-shadow(0 1px 4px rgba(80, 40, 0, 0.5));

          animation: goldShimmer 4s ease-in-out infinite;
        }

        .name-sep {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin: 10px 0;
        }
        .sep-line   { width:56px; height:.5px; background:linear-gradient(90deg,transparent,rgba(201,169,110,.75)); }
        .sep-line.r { background:linear-gradient(90deg,rgba(201,169,110,.75),transparent); }

        .scroll-cue {
          margin-top: 28px;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          animation: fadeUp .85s ease both .65s;
          opacity: 0;
        }
        .scroll-text {
          font-family: 'Battambang', serif;
          font-size: clamp(.66rem, 2.5vw, .8rem);
          color: rgba(201,169,110,.8);
          letter-spacing: .16em;
        }
        .scroll-arrow { animation: bounce 1.8s ease-in-out infinite; }

        /* ── DATE BADGE — Khmer ── */
        .date-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 14px 0 0;
          padding: 7px 20px;
          border: .5px solid rgba(201,169,110,.5);
          background: rgba(0,0,0,.32);
          backdrop-filter: blur(8px);
          border-radius: 40px;
          animation: fadeUp .85s ease both .55s;
          opacity: 0;
        }
        .date-badge span {
          font-family: 'Battambang', serif;
          font-size: clamp(.78rem, 3vw, .95rem);
          font-weight: 400;
          letter-spacing: .06em;
          color: rgba(255,225,150,.9);
        }
        .date-gem { width:4px; height:4px; background:#c9a96e; transform:rotate(45deg); flex-shrink:0; }

        @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.24)} }
        @keyframes bounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
        @keyframes goldShimmer {
          0%,100% { background-position:0% 0%; }
          50%     { background-position:0% 100%; }
        }
      `}</style>

      <div className="hero">
        <img className="hero-photo" src={COUPLE_BG} alt="Couple" />
        <div className="hero-overlay" />
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="frame-outer" />
        <div className="frame-inner" />

        {["fl-tl","fl-tr","fl-bl","fl-br"].map(cls => (
          <FloralCorner key={cls} className={`floral ${cls}`} />
        ))}

        {/* ── TOP ── */}
        <div className="hero-top">
          <div className="butterfly-row">
            <Butterfly color="#f0b8c0" />
            <Butterfly color="#e8d080" />
            <Butterfly color="#f0b8c0" flip />
          </div>

          <h1 className="title-main">ពិធីអាពាហ៍ពិពាហ៍</h1>

          <div className="title-ornament">
            <div className="orn-line" />
            <div className="orn-gem" />
            <span className="orn-star">✦</span>
            <div className="orn-gem" />
            <div className="orn-line r" />
          </div>

          <span className="title-reflection">ពិធីអាពាហ៍ពិពាហ៍</span>
        </div>

        {/* ── BOTTOM ── */}
        <div className="hero-bottom">
          <div className="names-block">
            <p className="sub-invite">សូមគោរពអញ្ជើញចូលរួម</p>

            <p className="name-kh">សយ សុខឃាង</p>

            <div className="name-sep">
              <div className="sep-line" />
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none"
                style={{ animation: "pulse 1.6s ease-in-out infinite" }}>
                <path d="M11 18C11 18 1 12 1 6A5 5 0 0 1 11 4.5 5 5 0 0 1 21 6C21 12 11 18 11 18Z"
                  fill="#c9a96e"/>
              </svg>
              <div className="sep-line r" />
            </div>

            <p className="name-kh">ឡាយ សុដាណេ</p>
          </div>

          {/* ── DATE BADGE in Khmer ── */}
          <div className="date-badge">
            <div className="date-gem" />
            <span>ថ្ងៃអង្គារ · ២១ មេសា ២០២៦ · ម៉ោង ៥:០០ ល្ងាច</span>
            <div className="date-gem" />
          </div>

          <div className="scroll-cue">
            <span className="scroll-text">អូសទៅក្រោម</span>
            <svg className="scroll-arrow" width="22" height="14" viewBox="0 0 22 14" fill="none">
              <path d="M2 2 L11 11 L20 2" stroke="#c9a96e" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M2 6 L11 15 L20 6" stroke="#c9a96e" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".4"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

function Butterfly({ color = "#f0a0b0", flip = false }) {
  return (
    <svg width="22" height="18" viewBox="0 0 20 16" fill="none"
      style={{ transform: flip ? "scaleX(-1)" : "none", opacity: .88 }}>
      <path d="M10 8 Q5 2 1 4 Q-1 9 5 11 Q8 12 10 8Z" fill={color} />
      <path d="M10 8 Q15 2 19 4 Q21 9 15 11 Q12 12 10 8Z" fill={color} opacity=".75" />
      <line x1="10" y1="4" x2="10" y2="13" stroke={color} strokeWidth=".8" />
    </svg>
  );
}

function FloralCorner({ className }) {
  return (
    <svg className={className} viewBox="0 0 108 108" fill="none">
      <path d="M8 8 Q45 18 58 58 Q18 45 8 8Z"  fill="#c9a96e" opacity=".16" />
      <path d="M8 8 Q28 40 58 58" stroke="#c9a96e" strokeWidth=".9" fill="none" opacity=".5" strokeDasharray="3 2.5"/>
      <circle cx="8"  cy="8"  r="4.5" fill="#c9a96e" opacity=".6" />
      <circle cx="28" cy="10" r="3"   fill="#c9a96e" opacity=".42" />
      <circle cx="10" cy="28" r="3"   fill="#c9a96e" opacity=".42" />
      <circle cx="20" cy="20" r="2"   fill="#c9a96e" opacity=".32" />
      <circle cx="58" cy="58" r="6"   fill="#c9a96e" opacity=".3" />
      <path d="M22 8 Q36 24 44 44 Q24 36 22 8Z" fill="#c9a96e" opacity=".1" />
      <path d="M8 22 Q24 36 44 44 Q36 24 8 22Z" fill="#c9a96e" opacity=".1" />
    </svg>
  );
}
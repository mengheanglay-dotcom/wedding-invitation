import { useState, useEffect } from "react";
import GoldDivider from "./GoldDivider";

const photos = [
  { src: "/image/Both Family.JPEG",   },
  { src: "/image/hold hands.JPEG",      },
  { src: "/image/boat heart.png",  },
  { src: "/image/floating protib.JPEG",  },
  { src: "/image/lan barang.png",      },
  { src: "/image/IMG_0211.JPEG",    },
  { src: "/image/cute.png",      },
  { src: "/image/Chinese.JPG",  },
  
  
];

export default function Gallery() {
  const [entered, setEntered] = useState({});

  useEffect(() => {
    const ids = photos.map((_, i) =>
      setTimeout(() => setEntered(p => ({ ...p, [i]: true })), 80 * i)
    );
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400&family=Cinzel:wght@400;500&family=Moul&family=Battambang:wght@300;400;700&display=swap');

        .gal-section {
          position: relative; padding: 88px 20px 104px;
          background: #fdf8f0; text-align: center; overflow: hidden;
        }
        .gal-section::before {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse at 20% 20%, rgba(255,210,150,.15) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 80%, rgba(240,190,130,.12) 0%, transparent 55%);
        }
        .gal-frame-o { position:absolute; inset:10px; border:1px solid rgba(185,148,70,.42); pointer-events:none; z-index:1; }
        .gal-frame-i { position:absolute; inset:16px; border:.5px dashed rgba(185,148,70,.22); pointer-events:none; z-index:1; }
        .gal-corner-deco { position:absolute; z-index:2; pointer-events:none; width:clamp(52px,11vw,74px); height:clamp(52px,11vw,74px); opacity:.62; }
        .gcd-tl { top:0; left:0; }
        .gcd-tr { top:0; right:0; transform:scaleX(-1); }
        .gcd-bl { bottom:0; left:0; transform:scaleY(-1); }
        .gcd-br { bottom:0; right:0; transform:scale(-1,-1); }
        .gal-inner { position:relative; z-index:3; }

        .gal-tag {
          font-family:'Cinzel',serif; font-size:clamp(.58rem,1.9vw,.68rem);
          letter-spacing:.32em; color:#9a7020; text-transform:uppercase; font-weight:500;
          margin-bottom:10px; animation:fadeUp .7s ease both .05s; opacity:0;
        }
        .gal-title {
          font-family:'Moul',serif; font-size:clamp(1.05rem,4.2vw,1.45rem);
          line-height:1.6; margin-bottom:4px;
          background:linear-gradient(175deg,#b8860b 0%,#d4a520 18%,#8b6400 38%,#c9a030 54%,#7a5000 70%,#c0941a 84%,#b8860b 100%);
          background-size:100% 200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          filter:drop-shadow(0 1px 3px rgba(150,90,0,.2));
          animation:fadeUp .75s ease both .1s, goldShimmer 3.5s ease-in-out infinite 1s; opacity:0;
        }

        /* ── GRID ── */
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(6,1fr);
          grid-template-rows: 200px 200px 200px;
          gap: 10px; max-width: 900px; margin: 44px auto 0;
        }
        .gal-item:nth-child(1) { grid-column:1/5; grid-row:1; }
        .gal-item:nth-child(2) { grid-column:5/7; grid-row:1/3; }
        .gal-item:nth-child(3) { grid-column:1/3; grid-row:2; }
        .gal-item:nth-child(4) { grid-column:3/5; grid-row:2; }
        .gal-item:nth-child(5) { grid-column:1/3; grid-row:3; }
        .gal-item:nth-child(6) { grid-column:3/7; grid-row:3; }

        .gal-item {
          position: relative; overflow: hidden; border-radius: 8px;
          background: #e8ddd0;
          opacity: 0; transform: translateY(20px) scale(.97);
          transition: opacity .6s ease, transform .6s ease;
          /* no cursor:pointer, no hover box-shadow — removed */
        }
        .gal-item.entered { opacity:1; transform:translateY(0) scale(1); }

        .gal-item img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: brightness(.9) saturate(.88);
          /* no transform transition — removed to save GPU */
        }

        /* ── GOLD SHIMMER REFLEX only — CSS animation, zero JS ── */
        .gi-shimmer {
          position: absolute; top: 0; left: -60%; width: 45%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,245,180,.18), transparent);
          transform: skewX(-12deg);
          pointer-events: none; z-index: 3;
          /* auto-play shimmer every 4s — no hover needed */
          animation: shimmerPass 4s ease-in-out infinite;
        }
        /* stagger each card's shimmer so they don't all fire at once */
        .gal-item:nth-child(1) .gi-shimmer { animation-delay: 0s; }
        .gal-item:nth-child(2) .gi-shimmer { animation-delay: .6s; }
        .gal-item:nth-child(3) .gi-shimmer { animation-delay: 1.2s; }
        .gal-item:nth-child(4) .gi-shimmer { animation-delay: 1.8s; }
        .gal-item:nth-child(5) .gi-shimmer { animation-delay: 2.4s; }
        .gal-item:nth-child(6) .gi-shimmer { animation-delay: 3s; }

        /* ── MOBILE ── */
        @media(max-width:600px){
          .gal-grid { grid-template-columns:1fr 1fr; grid-template-rows:repeat(4,180px); }
          .gal-item:nth-child(1) { grid-column:1/-1; grid-row:1; }
          .gal-item:nth-child(2) { grid-column:1/2;  grid-row:2; }
          .gal-item:nth-child(3) { grid-column:2/3;  grid-row:2; }
          .gal-item:nth-child(4) { grid-column:1/-1; grid-row:3; }
          .gal-item:nth-child(5) { grid-column:1/2;  grid-row:4; }
          .gal-item:nth-child(6) { grid-column:2/3;  grid-row:4; }
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px) }
          to   { opacity:1; transform:translateY(0) }
        }
        @keyframes goldShimmer {
          0%,100% { background-position:0% 0%; }
          50%     { background-position:0% 100%; }
        }
        @keyframes shimmerPass {
          0%,55%  { left: -60%; opacity: 0; }
          60%     { opacity: 1; }
          80%     { left: 120%; opacity: 1; }
          81%,100%{ left: 120%; opacity: 0; }
        }
      `}</style>

      <section className="gal-section reveal">
        <div className="gal-frame-o" />
        <div className="gal-frame-i" />
        {["gcd-tl","gcd-tr","gcd-bl","gcd-br"].map(c => (
          <GalCornerDeco key={c} className={`gal-corner-deco ${c}`} />
        ))}

        <div className="gal-inner">
          <p className="gal-tag">— A Glimpse Of Us —</p>
          <h2 className="gal-title">រូបភាពស្នេហា</h2>
          <GoldDivider />

          <div className="gal-grid">
            {photos.map((p, i) => (
              <div
                key={i}
                className={`gal-item ${entered[i] ? "entered" : ""}`}
                style={{ transitionDelay: `${i * 0.09}s` }}
              >
                <img src={p.src} alt={p.caption} loading="lazy" decoding="async" />
                <div className="gi-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function GalCornerDeco({ className }) {
  return (
    <svg className={className} viewBox="0 0 74 74" fill="none">
      <path d="M4 70 L4 4 L70 4" stroke="#c9a030" strokeWidth="1.2" fill="none" opacity=".58"/>
      <path d="M9 64 L9 9 L64 9" stroke="#c9a030" strokeWidth=".4" fill="none" opacity=".26" strokeDasharray="3 2"/>
      <circle cx="4" cy="4" r="3" fill="#c9a030" opacity=".68"/>
      <path d="M4 4 Q36 14 44 44 Q14 36 4 4Z" fill="#c9a030" opacity=".08"/>
      <path d="M4 4 Q22 32 44 44" stroke="#c9a030" strokeWidth=".7" fill="none" opacity=".32" strokeDasharray="3 2"/>
      <path d="M4 24 Q12 18 20 24 Q12 30 4 24Z" fill="#c9a030" opacity=".46"/>
      <path d="M24 4 Q18 12 24 20 Q30 12 24 4Z" fill="#c9a030" opacity=".46"/>
      <circle cx="22" cy="22" r="1.6" fill="#c9a030" opacity=".32"/>
      <rect x="44" y="44" width="6" height="6" fill="#c9a030" transform="rotate(45 47 47)" opacity=".22"/>
    </svg>
  );
}
import { useState, useEffect, useCallback, useRef } from "react";
import GoldDivider from "./GoldDivider";

const photos = [
  { src: "/image/IMG_0166.JPEG",  caption: "Our Story",          kh: "រឿងរ៉ាវរបស់យើង" },
  { src: "/image/IMG_0635.JPEG",  caption: "Together Forever",   kh: "នៅជាមួយគ្នារហូត"     },
  { src: "/image/IMG_0211.JPEG",  caption: "Long Life Together", kh: "មានជីវិតរួមគ្នា"  },
  { src: "/image/image copy 2.png",  caption: "Happiness",          kh: "សុភមង្គល"         },
  { src: "/image/image copy 4.png",  caption: "My Beautiful Wife",           kh: "ប្រពន្ធបងស្អាតដល់ហើយ"       },
  { src: "/image/image copy 3.png",      caption: "Take Oun on a boat",           kh: "នាំអូនជិះទូកលេង"              },
  { src: "/image/image2.png",      caption: "Love you Forever",           kh: "ស្រលាញ់អូនរហូត"   },
  { src: "/image/DSC_1194 copy.jpg",      caption: "Chinese Outfit",           kh: "我们结婚了"              },
 
];

// ── Pinch-to-zoom + drag hook ──
function usePinchZoom() {
  const ref      = useRef(null);
  const scale    = useRef(1);
  const origin   = useRef({ x: 0, y: 0 });
  const translate = useRef({ x: 0, y: 0 });
  const lastTap  = useRef(0);
  const touches  = useRef([]);

  const applyTransform = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      `translate(${translate.current.x}px, ${translate.current.y}px) scale(${scale.current})`;
  };

  const reset = () => {
    scale.current     = 1;
    translate.current = { x: 0, y: 0 };
    if (ref.current) ref.current.style.transform = "";
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dist = (a, b) =>
      Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

    const mid = (a, b) => ({
      x: (a.clientX + b.clientX) / 2,
      y: (a.clientY + b.clientY) / 2,
    });

    let startDist   = 0;
    let startScale  = 1;
    let startTrans  = { x: 0, y: 0 };
    let startMid    = { x: 0, y: 0 };
    let dragStart   = { x: 0, y: 0 };
    let isPinching  = false;
    let isDragging  = false;

    const onTouchStart = e => {
      touches.current = [...e.touches];

      // double-tap to reset
      const now = Date.now();
      if (e.touches.length === 1 && now - lastTap.current < 300) {
        reset();
        lastTap.current = 0;
        return;
      }
      lastTap.current = now;

      if (e.touches.length === 2) {
        isPinching = true;
        isDragging = false;
        startDist  = dist(e.touches[0], e.touches[1]);
        startScale = scale.current;
        startTrans = { ...translate.current };
        startMid   = mid(e.touches[0], e.touches[1]);
        const rect = el.parentElement.getBoundingClientRect();
        origin.current = {
          x: startMid.x - rect.left - rect.width  / 2,
          y: startMid.y - rect.top  - rect.height / 2,
        };
      } else if (e.touches.length === 1 && scale.current > 1) {
        isDragging = true;
        dragStart  = {
          x: e.touches[0].clientX - translate.current.x,
          y: e.touches[0].clientY - translate.current.y,
        };
      }
    };

    const onTouchMove = e => {
      e.preventDefault();

      if (isPinching && e.touches.length === 2) {
        const d       = dist(e.touches[0], e.touches[1]);
        const ratio   = d / startDist;
        const newScale = Math.min(Math.max(startScale * ratio, 1), 5);
        const m       = mid(e.touches[0], e.touches[1]);
        const rect    = el.parentElement.getBoundingClientRect();
        const cx      = m.x - rect.left - rect.width  / 2;
        const cy      = m.y - rect.top  - rect.height / 2;

        translate.current = {
          x: cx - (cx - startTrans.x) * (newScale / startScale),
          y: cy - (cy - startTrans.y) * (newScale / startScale),
        };
        scale.current = newScale;
        applyTransform();
      } else if (isDragging && e.touches.length === 1) {
        translate.current = {
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y,
        };
        applyTransform();
      }
    };

    const onTouchEnd = e => {
      if (e.touches.length < 2) isPinching = false;
      if (e.touches.length === 0) isDragging = false;
      if (scale.current <= 1.05) reset();
    };

    el.addEventListener("touchstart",  onTouchStart, { passive: false });
    el.addEventListener("touchmove",   onTouchMove,  { passive: false });
    el.addEventListener("touchend",    onTouchEnd,   { passive: true  });

    return () => {
      el.removeEventListener("touchstart",  onTouchStart);
      el.removeEventListener("touchmove",   onTouchMove);
      el.removeEventListener("touchend",    onTouchEnd);
    };
  }, []);

  return { ref, reset };
}

// ── Lightbox inner (uses hook) ──
function LightboxImage({ src, alt, caption, kh }) {
  const { ref, reset } = usePinchZoom();

  return (
    <div style={{
      position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      maxWidth: "92vw", maxHeight: "80svh",
      overflow: "hidden", borderRadius: 6,
      touchAction: "none",
    }}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        className="lb-img"
        style={{ transformOrigin: "center center", willChange: "transform" }}
        onDoubleClick={reset}
      />
    </div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [entered,  setEntered]  = useState({});

  const close = useCallback(() => setLightbox(null), []);
  const prev  = useCallback(() => setLightbox(i => (i - 1 + photos.length) % photos.length), []);
  const next  = useCallback(() => setLightbox(i => (i + 1) % photos.length), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = e => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, close, prev, next]);

  useEffect(() => {
    photos.forEach((_, i) =>
      setTimeout(() => setEntered(p => ({ ...p, [i]: true })), 100 * i)
    );
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500&family=Moul&family=Battambang:wght@300;400;700&display=swap');

        .gal-section {
          position:relative; padding:88px 20px 104px;
          background:#fdf8f0; text-align:center; overflow:hidden;
        }
        .gal-section::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(ellipse at 20% 20%, rgba(255,210,150,.18) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 80%, rgba(240,190,130,.14) 0%, transparent 55%);
          pointer-events:none; z-index:0;
        }
        .gal-frame-o{position:absolute;inset:10px;border:1px solid rgba(185,148,70,.42);pointer-events:none;z-index:1;}
        .gal-frame-i{position:absolute;inset:16px;border:.5px dashed rgba(185,148,70,.22);pointer-events:none;z-index:1;}
        .gal-corner-deco{position:absolute;z-index:2;pointer-events:none;width:clamp(52px,11vw,74px);height:clamp(52px,11vw,74px);opacity:.62;}
        .gcd-tl{top:0;left:0;}.gcd-tr{top:0;right:0;transform:scaleX(-1);}
        .gcd-bl{bottom:0;left:0;transform:scaleY(-1);}.gcd-br{bottom:0;right:0;transform:scale(-1,-1);}
        .gal-inner{position:relative;z-index:3;}

        .gal-tag{
          font-family:'Cinzel',serif; font-size:clamp(.58rem,1.9vw,.68rem);
          letter-spacing:.32em; color:#9a7020; text-transform:uppercase; font-weight:500;
          margin-bottom:10px; animation:fadeUp .7s ease both .05s; opacity:0;
        }
        .gal-title{
          font-family:'Moul',serif; font-size:clamp(1.05rem,4.2vw,1.45rem);
          line-height:1.6; margin-bottom:4px;
          background:linear-gradient(175deg,#b8860b 0%,#d4a520 18%,#8b6400 38%,#c9a030 54%,#7a5000 70%,#c0941a 84%,#b8860b 100%);
          background-size:100% 200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          filter:drop-shadow(0 1px 3px rgba(150,90,0,.2));
          animation:fadeUp .75s ease both .1s, goldShimmer 3.5s ease-in-out infinite 1s; opacity:0;
        }

        .gal-grid{
          display:grid; grid-template-columns:repeat(6,1fr);
          grid-template-rows:200px 200px 200px;
          gap:10px; max-width:900px; margin:44px auto 0;
        }
        .gal-item:nth-child(1){grid-column:1/5;grid-row:1;}
        .gal-item:nth-child(2){grid-column:5/7;grid-row:1/3;}
        .gal-item:nth-child(3){grid-column:1/3;grid-row:2;}
        .gal-item:nth-child(4){grid-column:3/5;grid-row:2;}
        .gal-item:nth-child(5){grid-column:1/3;grid-row:3;}
        .gal-item:nth-child(6){grid-column:3/7;grid-row:3;}

        .gal-item{
          position:relative; overflow:hidden; border-radius:8px;
          cursor:pointer; background:#e8ddd0;
          opacity:0; transform:translateY(20px) scale(.97);
          transition:opacity .6s ease, transform .6s ease, box-shadow .35s ease;
        }
        .gal-item.entered{opacity:1;transform:translateY(0) scale(1);}
        .gal-item img{
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform .6s cubic-bezier(.25,.46,.45,.94), filter .5s ease;
          filter:brightness(.9) saturate(.88);
        }
        .gal-item:hover{box-shadow:0 16px 48px rgba(107,39,55,.25),0 4px 16px rgba(0,0,0,.15);z-index:2;}
        .gal-item:hover img{transform:scale(1.08);filter:brightness(1.0) saturate(1.12);}
        .gal-item:hover .gi-overlay{opacity:1;}
        .gal-item:hover .gi-caption{opacity:1;transform:translateY(0);}
        .gal-item:hover .gi-corner{opacity:.85;}
        .gal-item:hover .gi-shimmer{left:120%;}
        .gal-item::after{
          content:''; position:absolute; inset:0; z-index:3;
          border:1.5px solid rgba(201,169,110,0); border-radius:8px;
          transition:border-color .35s ease; pointer-events:none;
        }
        .gal-item:hover::after{border-color:rgba(201,169,110,.55);}

        .gi-shimmer{
          position:absolute; top:0; left:-60%; width:45%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,245,180,.18),transparent);
          transform:skewX(-12deg); transition:left .6s ease;
          pointer-events:none; z-index:5;
        }
        .gi-overlay{
          position:absolute; inset:0; z-index:2;
          background:linear-gradient(to top,rgba(30,10,15,.82) 0%,rgba(30,10,15,.25) 45%,transparent 100%);
          opacity:0; transition:opacity .4s ease;
        }
        .gi-caption{
          position:absolute; bottom:0; left:0; right:0;
          padding:12px 14px 14px; z-index:4;
          transform:translateY(8px); opacity:0;
          transition:transform .4s ease, opacity .4s ease;
        }
        .gi-caption-line{width:24px;height:.5px;background:rgba(201,169,110,.75);margin:0 auto 5px;}
        .gi-caption-en{
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(.82rem,2.2vw,.96rem); color:#f0ddb0; margin:0;
          letter-spacing:.06em; text-shadow:0 1px 4px rgba(0,0,0,.6); display:block;
        }
        .gi-caption-kh{
          font-family:'Battambang',serif; font-size:clamp(.62rem,1.8vw,.74rem);
          font-weight:300; color:rgba(240,213,160,.7); margin:0; letter-spacing:.04em;
          text-shadow:0 1px 3px rgba(0,0,0,.5); display:block; margin-top:2px;
        }
        .gi-corner{
          position:absolute; width:16px; height:16px; z-index:4;
          opacity:0; transition:opacity .35s ease; pointer-events:none;
        }
        .gi-corner.tl{top:8px;left:8px;}.gi-corner.tr{top:8px;right:8px;transform:scaleX(-1);}
        .gi-corner.bl{bottom:8px;left:8px;transform:scaleY(-1);}.gi-corner.br{bottom:8px;right:8px;transform:scale(-1,-1);}

        /* ── LIGHTBOX ── */
        .lb-backdrop{
          position:fixed; inset:0; z-index:9999;
          background:rgba(4,2,1,.97); backdrop-filter:blur(18px);
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          animation:lbIn .3s ease both;
          touch-action:none;
        }
        @keyframes lbIn{from{opacity:0}to{opacity:1}}

        .lb-img-wrap{
          position:relative; display:flex;
          align-items:center; justify-content:center;
          width:92vw; height:78svh;
          overflow:hidden; border-radius:6px;
          border:.5px solid rgba(201,169,110,.18);
          animation:lbSlide .38s cubic-bezier(.34,1.2,.64,1) both;
        }
        @keyframes lbSlide{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}

        .lb-img{
          max-width:100%; max-height:100%;
          object-fit:contain; display:block;
          border-radius:4px; will-change:transform;
          box-shadow:0 28px 90px rgba(0,0,0,.75);
          transition:none;
          touch-action:none; user-select:none;
        }

        /* ── CLOSE BUTTON — big and clear ── */
        .lb-close{
          position:fixed; top:16px; right:16px; z-index:10001;
          width:52px; height:52px; border-radius:50%;
          border:2px solid rgba(201,169,110,.7);
          background:rgba(0,0,0,.65);
          backdrop-filter:blur(10px);
          cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:background .2s, transform .25s, border-color .2s;
          box-shadow:0 4px 18px rgba(0,0,0,.45);
        }
        .lb-close:hover{
          background:rgba(201,169,110,.22);
          border-color:#c9a96e;
          transform:rotate(90deg) scale(1.1);
          box-shadow:0 4px 22px rgba(201,169,110,.3);
        }
        .lb-close:active{transform:rotate(90deg) scale(.95);}

        /* close X label */
        .lb-close-label{
          position:fixed; top:72px; right:16px; z-index:10001;
          font-family:'Cinzel',serif; font-size:.5rem;
          letter-spacing:.2em; color:rgba(201,169,110,.5);
          text-transform:uppercase; text-align:center;
          width:52px;
          animation:fadeUp .5s ease both .2s; opacity:0;
        }

        .lb-btn{
          position:fixed; top:50%; transform:translateY(-50%);
          z-index:10000; width:48px; height:48px; border-radius:50%;
          border:1px solid rgba(201,169,110,.4);
          background:rgba(0,0,0,.45); backdrop-filter:blur(8px);
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          transition:background .2s, border-color .2s, transform .2s;
        }
        .lb-btn:hover{
          background:rgba(201,169,110,.18); border-color:rgba(201,169,110,.75);
          transform:translateY(-50%) scale(1.12);
        }
        .lb-prev{left:12px;} .lb-next{right:12px;}

        .lb-bottom{
          position:fixed; bottom:0; left:0; right:0;
          z-index:10000; padding:14px 16px 20px;
          background:linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 100%);
          display:flex; flex-direction:column; align-items:center; gap:10px;
        }

        .lb-info{ text-align:center; }
        .lb-info-en{
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(.88rem,2.5vw,1.05rem); color:rgba(201,169,110,.9);
          letter-spacing:.1em; display:block;
          text-shadow:0 1px 6px rgba(0,0,0,.6);
        }
        .lb-info-kh{
          font-family:'Battambang',serif; font-size:clamp(.66rem,2vw,.78rem);
          font-weight:300; color:rgba(201,169,110,.6); letter-spacing:.06em;
          display:block; margin-top:3px;
        }

        .lb-dots{display:flex;gap:8px;align-items:center;}
        .lb-dot{
          width:5px; height:5px; border-radius:50%;
          background:rgba(201,169,110,.3);
          cursor:pointer; border:none; padding:0;
          transition:background .25s, transform .25s, width .25s;
        }
        .lb-dot.active{background:#c9a96e;transform:scale(1.4);width:16px;border-radius:3px;}

        .lb-counter{
          font-family:'Cinzel',serif; font-size:.58rem;
          letter-spacing:.28em; color:rgba(201,169,110,.45);
        }

        .lb-hint{
          position:fixed; top:27px; left:21%; transform:translateX(-50%);
          z-index:10000; display:flex; align-items:center; gap:6px;
          background:rgba(0,0,0,.45); backdrop-filter:blur(8px);
          border:1px solid rgba(201,169,110,.25); border-radius:20px;
          padding:5px 14px;
          animation:fadeUp .5s ease both .4s;
          opacity:0;
        }
        .lb-hint span{
          font-family:'Battambang',serif; font-size:.84rem;
          color:rgba(201,169,110,.7); letter-spacing:.04em;
        }
        @keyframes fadeOut{from{opacity:1}to{opacity:0;pointer-events:none;}}

        @media(max-width:600px){
          .gal-grid{grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,180px);}
          .gal-item:nth-child(1){grid-column:1/-1;grid-row:1;}
          .gal-item:nth-child(2){grid-column:1/2;grid-row:2;}
          .gal-item:nth-child(3){grid-column:2/3;grid-row:2;}
          .gal-item:nth-child(4){grid-column:1/-1;grid-row:3;}
          .gal-item:nth-child(5){grid-column:1/2;grid-row:4;}
          .gal-item:nth-child(6){grid-column:2/3;grid-row:4;}
        }
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes goldShimmer{0%,100%{background-position:0% 0%;}50%{background-position:0% 100%;}}
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
                style={{ transitionDelay:`${i * 0.09}s` }}
                onClick={() => setLightbox(i)}
              >
                <img src={p.src} alt={p.caption} />
                <div className="gi-shimmer" />
                <div className="gi-overlay" />
                {["tl","tr","bl","br"].map(c => (
                  <svg key={c} className={`gi-corner ${c}`} viewBox="0 0 16 16" fill="none">
                    <path d="M1 15 L1 1 L15 1" stroke="#c9a96e" strokeWidth="1.2" fill="none" opacity=".9"/>
                    <circle cx="1" cy="1" r="1.5" fill="#c9a96e"/>
                  </svg>
                ))}
                <div className="gi-caption">
                  <div className="gi-caption-line" />
                  <span className="gi-caption-en">{p.caption}</span>
                  <span className="gi-caption-kh">{p.kh}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="lb-backdrop" onClick={close}>

          {/* ── BIG CLEAR CLOSE BUTTON ── */}
          <button className="lb-close" onClick={close} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2 L16 16" stroke="#c9a96e" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M16 2 L2 16"  stroke="#c9a96e" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="lb-close-label ">Close</span>

          {/* zoom hint — fades after 3s */}
          <div className="lb-hint">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="rgba(201,169,110,.7)" strokeWidth="1"/>
              <path d="M4.5 7 H9.5 M7 4.5 V9.5" stroke="rgba(201,169,110,.7)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span>ចុចពីរដង ឬ pinch ដើម្បី zoom</span>
          </div>

          {/* image with pinch zoom */}
          <div className="lb-img-wrap" onClick={e => e.stopPropagation()}>
            <LightboxImage
              key={lightbox}
              src={photos[lightbox].src}
              alt={photos[lightbox].caption}
              caption={photos[lightbox].caption}
              kh={photos[lightbox].kh}
            />
          </div>

          {/* prev / next */}
          <button className="lb-btn lb-prev"
            onClick={e=>{e.stopPropagation();prev();}} aria-label="Previous">
            <svg width="11" height="18" viewBox="0 0 12 18" fill="none">
              <path d="M10 2 L2 9 L10 16" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="lb-btn lb-next"
            onClick={e=>{e.stopPropagation();next();}} aria-label="Next">
            <svg width="11" height="18" viewBox="0 0 12 18" fill="none">
              <path d="M2 2 L10 9 L2 16" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* bottom bar — caption + dots + counter */}
          <div className="lb-bottom" onClick={e=>e.stopPropagation()}>
            <div className="lb-info">
              <span className="lb-info-en">{photos[lightbox].caption}</span>
              <span className="lb-info-kh">{photos[lightbox].kh}</span>
            </div>
            <div className="lb-dots">
              {photos.map((_,i) => (
                <button
                  key={i}
                  className={`lb-dot ${i===lightbox?"active":""}`}
                  onClick={()=>setLightbox(i)}
                  aria-label={`Photo ${i+1}`}
                />
              ))}
            </div>
            <span className="lb-counter">
              {String(lightbox+1).padStart(2,"0")} / {String(photos.length).padStart(2,"0")}
            </span>
          </div>

        </div>
      )}
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
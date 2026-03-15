import { px } from 'framer-motion';
import React from 'react'

const petals = [
  { x:"8%",   size:18, dur:7,  delay:0,   rot:-20, color:"#f4b8c8" },
  { x:"18%",  size:14, dur:9,  delay:1.5, rot:15,  color:"#f0a8be" },
  { x:"30%",  size:22, dur:8,  delay:0.8, rot:-35, color:"#e8a0b8" },
  { x:"45%",  size:16, dur:11, delay:2.2, rot:40,  color:"#f5c0cc" },
  { x:"58%",  size:20, dur:7.5,delay:0.3, rot:-10, color:"#f0b0c4" },
  { x:"70%",  size:13, dur:10, delay:3,   rot:25,  color:"#e8a8bc" },
  { x:"82%",  size:18, dur:8.5,delay:1.1, rot:-45, color:"#f4bcc8" },
  { x:"92%",  size:15, dur:9.5,delay:2.7, rot:30,  color:"#f0b4c0" },
  { x:"5%",   size:12, dur:12, delay:4,   rot:10,  color:"#eeaac0" },
  { x:"25%",  size:16, dur:8,  delay:5,   rot:-28, color:"#f5b8c8" },
  { x:"50%",  size:11, dur:13, delay:1.8, rot:18,  color:"#f0a8bc" },
  { x:"75%",  size:19, dur:7,  delay:3.5, rot:-15, color:"#f4bcc4" },
  { x:"88%",  size:14, dur:10, delay:0.6, rot:42,  color:"#eaaabe" },
  { x:"38%",  size:17, dur:9,  delay:4.5, rot:-32, color:"#f2b0c4" },
  { x:"62%",  size:13, dur:11, delay:2.4, rot:22,  color:"#f5c0cc" },
];

function PetalSVG({ style, color }) {
  return (
    <svg style={style} className="petal" viewBox="0 0 24 32" fill="none">
      <path d="M12 2 C18 6 22 14 20 22 C18 28 12 30 12 30 C12 30 6 28 4 22 C2 14 6 6 12 2Z"
        fill={color} opacity=".85"/>
      <path d="M12 4 C12 4 12 26 12 29" stroke="rgba(180,80,100,.25)" strokeWidth=".6" fill="none"/>
    </svg>
  );
}

function ArtDecoCorner({ className }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <path d="M4 76 L4 4 L76 4" stroke="#c9a030" strokeWidth="1" fill="none" opacity=".6"/>
      <path d="M10 70 L10 10 L70 10" stroke="#c9a030" strokeWidth=".4" fill="none" opacity=".3" strokeDasharray="3 2"/>
      <circle cx="4" cy="4" r="3" fill="#c9a030" opacity=".7"/>
      <path d="M20 4 Q40 10 50 30 Q38 38 4 20" stroke="#c9a030" strokeWidth=".6" fill="none" opacity=".35"/>
      <path d="M4 28 Q12 22 20 28 Q12 34 4 28Z" fill="#c9a030" opacity=".4"/>
      <path d="M28 4 Q22 12 28 20 Q34 12 28 4Z" fill="#c9a030" opacity=".4"/>
      <circle cx="14" cy="14" r="2"   fill="#c9a030" opacity=".35"/>
      <circle cx="22" cy="10" r="1.5" fill="#c9a030" opacity=".3"/>
      <circle cx="10" cy="22" r="1.5" fill="#c9a030" opacity=".3"/>
      <rect x="32" y="32" width="6" height="6" fill="#c9a030"
        transform="rotate(45 35 35)" opacity=".3"/>
    </svg>
  );
}

export default function ThankYou() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=Moul&family=Battambang:wght@300;400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ty {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background: #fdf8f0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 52px 28px 60px;
          overflow: hidden;
          text-align: center;
        }

        .ty-frame-o { position:absolute; inset:10px; border:1px solid rgba(185,148,70,0.55); pointer-events:none; z-index:1; }
        .ty-frame-i { position:absolute; inset:16px; border:.5px solid rgba(185,148,70,0.28); pointer-events:none; z-index:1; }

        .ty-corner { position:absolute; z-index:2; pointer-events:none; width:clamp(56px,12vw,80px); height:clamp(56px,12vw,80px); opacity:.7; }
        .c-tl { top:0; left:0; }
        .c-tr { top:0; right:0; transform:scaleX(-1); }
        .c-bl { bottom:0; left:0; transform:scaleY(-1); }
        .c-br { bottom:0; right:0; transform:scale(-1,-1); }

        .petal { position:absolute; z-index:0; pointer-events:none; animation:petalFall linear infinite; opacity:0; }

        @keyframes petalFall {
          0%   { opacity:0;   transform:translateY(-40px) rotate(0deg) scale(1); }
          8%   { opacity:.8; }
          85%  { opacity:.55; }
          100% { opacity:0;   transform:translateY(105vh) rotate(400deg) scale(.7); }
        }

        .ty-body {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── TITLE ── */
        .ty-title {
          font-family: 'Preahvihear', serif;
          font-size: clamp(1.6rem, 5.2vw, 1.7rem);
          line-height: 1.8;
          margin-bottom: 6px;
          background: linear-gradient(
            175deg,
            #b8860b 0%, #d4a520 20%, #8b6400 40%,
            #c9a030 55%, #7a5000 70%, #c0941a 85%, #b8860b 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 1px 3px rgba(150,100,0,.18));
          animation: fadeUp .75s ease both .1s, goldShimmer 3.5s ease-in-out infinite 1s;
          opacity: 0;
        }

        /* ── title ornament ── */
        .ty-title-orn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin: 8px auto 20px;
          max-width: 200px;
          animation: fadeUp .7s ease both .18s;
          opacity: 0;
        }
        .tto-line   { flex:1; height:.5px; background:linear-gradient(90deg,transparent,rgba(185,148,70,.75)); }
        .tto-line.r { background:linear-gradient(90deg,rgba(185,148,70,.75),transparent); }
        .tto-gem    { width:5px; height:5px; background:#c9a030; transform:rotate(45deg); flex-shrink:0; }
        .tto-heart  { flex-shrink:0; }

        /* ── BODY PARAGRAPHS ── */
        .ty-para {
          font-family: 'Preahvihear', serif;
          font-size: clamp(1rem, 3.4vw, 1.05rem);
          font-weight: 400;
          color: #5a3a08;
          line-height: 2.1;
          margin-bottom: 0;
          animation: fadeUp .8s ease both;
          opacity: 0;
        }
        .ty-para strong {
          font-weight: 700;
          color: #3a2008;
        }

        /* ── divider between paras ── */
        .ty-mid-div {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin: 16px auto;
          max-width: 240px;
          animation: fadeUp .6s ease both;
          opacity: 0;
        }
        .tmd-line   { flex:1; height:.5px; background:linear-gradient(90deg,transparent,rgba(185,148,70,.6)); }
        .tmd-line.r { background:linear-gradient(90deg,rgba(185,148,70,.6),transparent); }
        .tmd-gem    { width:4px; height:4px; background:#c9a030; transform:rotate(45deg); flex-shrink:0; }

        /* ── closing line ── */
        .ty-closing {
          font-family: 'Battambang', serif;
          font-size: clamp(.82rem, 3.2vw, 1rem);
          font-weight: 700;
          color: #7a5010;
          letter-spacing: .04em;
          margin-top: 4px;
          animation: fadeUp .8s ease both .75s;
          opacity: 0;
        }

        /* bottom arc */
        .ty-arc {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          opacity: .5;
          pointer-events: none;
          animation: fadeUp .8s ease both .9s;
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes goldShimmer {
          0%,100% { background-position:0% 0%; }
          50%     { background-position:0% 100%; }
        }
      `}</style>

      <div className="ty">

        <div className="ty-frame-o" />
        <div className="ty-frame-i" />

        {["c-tl","c-tr","c-bl","c-br"].map(c => (
          <ArtDecoCorner key={c} className={`ty-corner ${c}`} />
        ))}

        {petals.map((p, i) => (
          <PetalSVG key={i} style={{
            left: p.x,
            top: `-${p.size * 2}px`,
            width: p.size,
            height: p.size * 1.3,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rot}deg)`,
          }} color={p.color} />
        ))}

        <div className="ty-body">

          {/* ── TITLE ── */}
          <h2 className="ty-title">សេចក្តីថ្លែងអំណរគុណ</h2>

          {/* title ornament */}
          <div className="ty-title-orn">
            <div className="tto-line" />
            <div className="tto-gem" />
            <svg className="tto-heart"  width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 9C5 9 1 6 1 3.2A2.2 2.2 0 0 1 5 2 2.2 2.2 0 0 1 9 3.2C9 6 5 9 5 9Z"
                fill="#c9a030" opacity=".8"/>
            </svg>
            <div className="tto-gem" />
            <div className="tto-line r" />
          </div>

          {/* ── FIRST PARAGRAPH ── */}
          <p className="ty-para" style={{ animationDelay: ".28s" }}>
            ខ្ញុំបាទ នាងខ្ញុំ ជាមាតាបិតា កូនប្រុស កូនស្រី<br />
            សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ ចំពោះវត្តមាន<br />
            ដ៏ឧត្តុងឧត្តម ក្នុងពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍<br />
            <strong>កូនប្រុស កូនស្រី របស់យើងខ្ញុំ ។</strong>
          </p>

          {/* ── MID DIVIDER ── */}
          <div className="ty-mid-div" style={{ animationDelay: ".48s" }}>
            <div className="tmd-line" />
            <div className="tmd-gem" />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 9C5 9 1 6 1 3.2A2.2 2.2 0 0 1 5 2 2.2 2.2 0 0 1 9 3.2C9 6 5 9 5 9Z"
                fill="#c9a030" opacity=".7"/>
            </svg>
            <div className="tmd-gem" />
            <div className="tmd-line r" />
          </div>

          {/* ── SECOND PARAGRAPH ── */}
          <p className="ty-para" style={{ animationDelay: ".55s" }}>
            សូមជំរាបជូន ឯកឧត្តម លោកជំទាវ លោក<br />
            លោកស្រី អ្នកនាងកញ្ញា និងភ្ញៀវកិត្តិយសទាំងអស់<br />
            ទទួលនូវសេចក្តីគោរពដ៏ខ្ពង់ខ្ពស់<br />
            អំពើយើងខ្ញុំ ។
          </p>

          {/* ── CLOSING ── */}
          {/* <p className="ty-closing">អរព្យើងខ្ញុំ ។</p> */}

        </div>

        {/* bottom arc */}
        <svg className="ty-arc" width="160" height="28" viewBox="0 0 160 28" fill="none">
          <path d="M10 4 Q80 28 150 4" stroke="#c9a030" strokeWidth=".8" fill="none" strokeDasharray="3 2"/>
          <circle cx="10"  cy="4"  r="3" fill="#c9a030" opacity=".6"/>
          <circle cx="80"  cy="22" r="4" fill="#c9a030" opacity=".5"/>
          <circle cx="150" cy="4"  r="3" fill="#c9a030" opacity=".6"/>
        </svg>

      </div>
    </>
  );
}
import { useEffect, useState } from "react";
import GoldDivider from "./GoldDivider";

export default function Countdown() {
  const weddingDate = new Date("April 21, 2026 17:00:00");
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = weddingDate - new Date();
      if (diff <= 0) { setTime({ days:0, hours:0, minutes:0, seconds:0 }); return; }
      setTime({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const units = [
    { val: time.days,    labelEn: "Days",    labelKh: "ថ្ងៃ" },
    { val: time.hours,   labelEn: "Hours",   labelKh: "ម៉ោង" },
    { val: time.minutes, labelEn: "Minutes", labelKh: "នាទី" },
    { val: time.seconds, labelEn: "Seconds", labelKh: "វិនាទី" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Cinzel:wght@400;500&family=Moul&family=Battambang:wght@400;700&display=swap');

        .cd-section {
          position: relative;
          padding: 90px 24px 100px;
          text-align: center;

          /* ── cream bg matching concept ── */
          background:
            linear-gradient(180deg,
              #fdf8f0 0%,
              #fceee0 20%,
              #f5e4d0 50%,
              #fceee0 80%,
              #fdf8f0 100%
            );
          overflow: hidden;
        }

        /* warm radial glow */
        .cd-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 50% 0%,   rgba(255,210,140,.25) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 100%, rgba(240,190,120,.2)  0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* decorative rings */
        .cd-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(185,148,70,.14);
          pointer-events: none;
          transform: translate(-50%,-50%);
        }

        /* ── top tag ── */
        .cd-tag {
          position: relative; z-index: 1;
          font-family: 'Cinzel', serif;
          font-size: clamp(.62rem, 2vw, .72rem);
          letter-spacing: .3em;
          color: #9a7020;
          text-transform: uppercase;
          margin-bottom: 12px;
          font-weight: 500;
          animation: fadeUp .7s ease both .05s;
          opacity: 0;
        }

        /* ── Khmer title ── */
        .cd-title {
          position: relative; z-index: 1;
          font-family: 'Moul', serif;
          font-size: clamp(1.4rem, 4.8vw, 1.6rem);
          line-height: 1.73;
          margin-bottom: 4px;
          background: linear-gradient(175deg,
            #b8860b 0%, #d4a520 18%, #8b6400 38%,
            #c9a030 54%, #7a5000 70%, #c0941a 84%, #b8860b 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter:
            drop-shadow(0 0 8px rgba(255,200,50,.3))
            drop-shadow(0 2px 10px rgba(0,0,0,.2))
            drop-shadow(0 1px 2px rgba(80,40,0,.35));
          animation: fadeUp .75s ease both .1s, goldShimmer 3.5s ease-in-out infinite 1s;
          opacity: 0;
        }

        /* ── BOXES ── */
        .cd-boxes {
          position: relative; z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(8px, 2.5vw, 16px);
          flex-wrap: nowrap;
          margin: 44px auto 0;
          max-width: 560px;
        }

        .cd-box {
          position: relative;
          width: clamp(74px, 19vw, 112px);
          padding: 20px 8px 16px;
          background: rgba(255,250,240,.75);
          border: 1.5px solid rgba(185,148,70,.45);
          border-radius: 10px;
          overflow: hidden;
          animation: fadeUp .8s ease both;
          opacity: 0;
          box-shadow:
            inset 0 1px 0 rgba(255,245,200,.6),
            inset 0 -1px 0 rgba(185,148,70,.15),
            0 4px 20px rgba(150,100,0,.12),
            0 1px 4px rgba(150,100,0,.08);
        }

        /* shimmer sweep */
        .cd-box::before {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 55%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,240,160,.18), transparent);
          animation: sweep 3.5s ease-in-out infinite;
          pointer-events: none;
        }

        /* gold top accent */
        .cd-box::after {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 2.5px;
          background: linear-gradient(90deg, transparent, #c9a030, transparent);
          border-radius: 0 0 2px 2px;
        }

        /* number */
        .cd-number {
          font-family: 'Battambang', serif;
          font-size: clamp(2.7rem, 7.5vw, 3.4rem);
          font-weight: 600;
          line-height: 1;
          margin-bottom: 10px;
          display: block;
          letter-spacing: .02em;
          background: linear-gradient(175deg,
            #b8860b 0%, #d4a520 18%, #8b6400 38%,
            #c9a030 54%, #7a5000 70%, #c0941a 84%, #b8860b 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter:
            drop-shadow(0 1px 0 rgba(255,255,255,.8))
            drop-shadow(0 2px 6px rgba(150,90,0,.3));
          animation: goldShimmer 3s ease-in-out infinite;
        }

        .cd-sep {
          width: 32px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(185,148,70,.7), transparent);
          margin: 0 auto 8px;
          border-radius: 1px;
        }

        /* label Khmer — bold */
        .cd-label-kh {
          font-family: 'Battambang', serif;
          font-size: clamp(1.2rem, 2.2vw, .78rem);
          font-weight: 700;
          color: #7a5010;
          letter-spacing: .04em;
          display: block;
          text-shadow:
            0 1px 0 rgba(255,255,255,.9),
            0 1px 4px rgba(255,255,255,.6);
        }

        /* label English */
        .cd-label-en {
          font-family: 'Cinzel', serif;
          font-size: clamp(.5rem, 1.6vw, .6rem);
          font-weight: 500;
          letter-spacing: .18em;
          color: #9a7020;
          text-transform: uppercase;
          display: block;
          margin-top: 3px;
        }

        /* colon */
        .cd-colon {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5.5vw, 2.8rem);
          font-weight: 600;
          color: rgba(185,148,70,.5);
          align-self: center;
          margin-top: -10px;
          line-height: 1;
          flex-shrink: 0;
          animation: fadeUp .7s ease both .3s;
          opacity: 0;
        }

        /* ── bottom date block ── */
        .cd-date-block {
          position: relative; z-index: 1;
          margin-top: 52px;
          animation: fadeUp .8s ease both .55s;
          opacity: 0;
        }

        .cd-date-ornament {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; max-width: 240px; margin: 0 auto 14px;
        }
        .cd-orn-line   { flex:1; height:.5px; background:linear-gradient(90deg,transparent,rgba(185,148,70,.65)); }
        .cd-orn-line.r { background:linear-gradient(90deg,rgba(185,148,70,.65),transparent); }
        .cd-orn-gem    { width:5px; height:5px; background:#c9a030; transform:rotate(45deg); flex-shrink:0; }

        /* date Khmer — bold + shadow */
        .cd-date-kh {
          font-family: 'Battambang', serif;
          font-size: clamp(.84rem, 3.2vw, 1rem);
          font-weight: 700;
          color: #5a3a08;
          letter-spacing: .06em;
          margin-bottom: 6px;
          text-shadow:
            0 1px 0 rgba(255,255,255,.9),
            0 2px 8px rgba(255,255,255,.7),
            0 0 16px rgba(255,240,200,.5);
        }

        /* date English — italic serif */
        .cd-date-en {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(.92rem, 3.4vw, 1.12rem);
          font-weight: 600;
          color: #7a5010;
          letter-spacing: .06em;
          text-shadow:
            0 1px 0 rgba(255,255,255,.9),
            0 2px 6px rgba(255,255,255,.6);
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes goldShimmer {
          0%,100% { background-position:0% 0%; }
          50%     { background-position:0% 100%; }
        }
        @keyframes sweep {
          0%   { left:-80%; }
          60%  { left:140%; }
          100% { left:140%; }
        }
      `}</style>

      <section className="cd-section reveal">

        {/* decorative rings */}
        {[
          ["-5%","20%",320], ["105%","70%",260], ["50%","108%",400],
          ["15%","85%",180], ["88%","12%",200],
        ].map(([l,t,s],i) => (
          <div key={i} className="cd-ring"
            style={{ left:l, top:t, width:s, height:s }} />
        ))}

        <p className="cd-tag">— The Big Day —</p>

        <h2 className="cd-title">រហូតដល់ថ្ងៃរបស់ពួកយើង</h2>

        <GoldDivider />

        {/* boxes */}
        <div className="cd-boxes">
          {units.map(({ val, labelEn, labelKh }, i) => (
            <>
              <div key={labelEn} className="cd-box"
                style={{ animationDelay:`${.18 + i * .1}s` }}>
                <span className="cd-number">{String(val).padStart(2,"0")}</span>
                <div className="cd-sep" />
                <span className="cd-label-kh">{labelKh}</span>
                <span className="cd-label-en">{labelEn}</span>
              </div>
              {i < 3 && (
                <span key={`c${i}`} className="cd-colon"
                  style={{ animationDelay:`${.22 + i * .1}s` }}>
                  :
                </span>
              )}
            </>
          ))}
        </div>

        {/* bottom date */}
        <div className="cd-date-block">
          <div className="cd-date-ornament">
            <div className="cd-orn-line" />
            <div className="cd-orn-gem" />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 9C5 9 1 6 1 3.2A2.2 2.2 0 0 1 5 2 2.2 2.2 0 0 1 9 3.2C9 6 5 9 5 9Z"
                fill="#c9a030" opacity=".85"/>
            </svg>
            <div className="cd-orn-gem" />
            <div className="cd-orn-line r" />
          </div>

          <p className="cd-date-kh">
            ថ្ងៃអង្គារ · ២១ មេសា ២០២៦ · ម៉ោង ៥:០០ ល្ងាច
          </p>
          <p className="cd-date-en">
            AEON 3 Mall Meanchey · Hall A+B · Phnom Penh
          </p>
        </div>

      </section>
    </>
  );
}
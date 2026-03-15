import GoldDivider from "./GoldDivider";

const petals = [
  { x:"6%",  size:14, dur:8,   delay:0,   rot:-18, color:"#f4b8c8" },
  { x:"20%", size:11, dur:10,  delay:1.3, rot:20,  color:"#f0a8be" },
  { x:"78%", size:16, dur:7.5, delay:0.6, rot:-30, color:"#e8a0b8" },
  { x:"92%", size:12, dur:11,  delay:2,   rot:38,  color:"#f5c0cc" },
  { x:"45%", size:10, dur:9,   delay:1.8, rot:15,  color:"#f0b0c4" },
];

function PetalSVG({ style, color }) {
  return (
    <svg style={style} className="loc-petal" viewBox="0 0 24 32" fill="none">
      <path d="M12 2C18 6 22 14 20 22C18 28 12 30 12 30C12 30 6 28 4 22C2 14 6 6 12 2Z"
        fill={color} opacity=".8"/>
    </svg>
  );
}

export default function Location() {
  const mapLink = "https://maps.app.goo.gl/bnCh4JHVza8Hp91o9?g_st=ic";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500&family=Moul&family=Battambang:wght@300;400;700&display=swap');

        .loc-section {
          position: relative;
          padding: 88px 24px 100px;
          text-align: center;
          background: #fdf8f0;
          overflow: hidden;
        }

        .loc-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 20% 30%, rgba(255,210,160,.22) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 70%, rgba(240,190,140,.18) 0%, transparent 55%);
          pointer-events: none; z-index: 0;
        }

        /* fixed gold frame */
        .loc-frame-o { position:absolute; inset:10px; border:1px solid rgba(185,148,70,.45); pointer-events:none; z-index:1; }
        .loc-frame-i { position:absolute; inset:16px; border:.5px dashed rgba(185,148,70,.25); pointer-events:none; z-index:1; }

        /* corner */
        .loc-corner { position:absolute; z-index:2; pointer-events:none; width:clamp(54px,11vw,76px); height:clamp(54px,11vw,76px); opacity:.65; }
        .lc-tl{top:0;left:0;} .lc-tr{top:0;right:0;transform:scaleX(-1);}
        .lc-bl{bottom:0;left:0;transform:scaleY(-1);} .lc-br{bottom:0;right:0;transform:scale(-1,-1);}

        /* petals */
        .loc-petal { position:absolute; z-index:0; pointer-events:none; animation:petalFall linear infinite; opacity:0; }
        @keyframes petalFall {
          0%   { opacity:0; transform:translateY(-30px) rotate(0deg); }
          8%   { opacity:.7; }
          85%  { opacity:.45; }
          100% { opacity:0; transform:translateY(100vh) rotate(360deg); }
        }

        .loc-inner { position:relative; z-index:3; }

        /* tag */
        .loc-tag {
          font-family: 'Cinzel', serif;
          font-size: clamp(.6rem,2vw,.7rem);
          letter-spacing: .3em;
          color: #9a7020;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 10px;
          animation: fadeUp .7s ease both .05s; opacity: 0;
        }

        /* title */
        .loc-title {
          font-family: 'Moul', serif;
          font-size: clamp(1.1rem,4.5vw,1.5rem);
          line-height: 1.8;
          margin-bottom: 4px;
          background: linear-gradient(175deg,
            #b8860b 0%, #d4a520 18%, #8b6400 38%,
            #c9a030 54%, #7a5000 70%, #c0941a 84%, #b8860b 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 1px 3px rgba(150,90,0,.2));
          animation: fadeUp .75s ease both .1s, goldShimmer 3.5s ease-in-out infinite 1s; opacity: 0;
        }

        /* ── VENUE CARD ── */
        .loc-card {
          position: relative;
          margin: 40px auto 0;
          max-width: 480px;
          padding: 0;
          border-radius: 16px;
          overflow: hidden;
          animation: fadeUp .8s ease both .25s; opacity: 0;
          box-shadow:
            0 2px 0 rgba(255,245,200,.8) inset,
            0 20px 50px rgba(150,100,0,.14),
            0 4px 12px rgba(150,100,0,.08);
          border: 1.5px solid rgba(185,148,70,.45);
          background: rgba(255,252,244,.92);
          backdrop-filter: blur(8px);
        }

        /* card top gold band */
        .loc-card-band {
          height: 4px;
          background: linear-gradient(90deg, transparent, #c9a030 30%, #f0d060 50%, #c9a030 70%, transparent);
        }

        .loc-card-body { padding: 32px 28px 28px; }

        /* pin icon container */
        .loc-pin {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 1.5px solid rgba(185,148,70,.5);
          background: linear-gradient(145deg, #fdf4e0, #f5e4b0);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 4px 14px rgba(150,100,0,.15);
        }

        /* venue name */
        .loc-venue-name {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.23rem, 4vw, 1.3rem);
          font-weight: 500;
          letter-spacing: .06em;
          color: #3a2008;
          margin-bottom: 6px;
          text-shadow: 0 1px 0 rgba(255,255,255,.9);
        }

        .loc-venue-hall {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1rem, 3vw, 1.05rem);
          font-weight: 600;
          color: #7a5010;
          margin-bottom: 4px;
          text-shadow: 0 1px 0 rgba(255,255,255,.9);
        }

        .loc-venue-city {
          font-family: 'Battambang', serif;
          font-size: clamp(.82rem, 2.5vw, .86rem);
          font-weight: 400;
          color: #9a7020;
          letter-spacing: .08em;
          margin-bottom: 20px;
        }

        /* card divider */
        .loc-card-div {
          display: flex; align-items: center; justify-content: center;
          gap: 6px; max-width: 180px; margin: 0 auto 20px;
        }
        .lcd-line   { flex:1; height:.5px; background:linear-gradient(90deg,transparent,rgba(185,148,70,.7)); }
        .lcd-line.r { background:linear-gradient(90deg,rgba(185,148,70,.7),transparent); }
        .lcd-gem    { width:4px; height:4px; background:#c9a030; transform:rotate(45deg); flex-shrink:0; }

        /* map button */
        .loc-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 40px;
          background: linear-gradient(135deg, #d4a820 0%, #a07010 100%);
          color: #fffbe0;
          text-decoration: none;
          font-family: 'Battambang', serif;
          font-size: clamp(.78rem, 3vw, .92rem);
          font-weight: 700;
          letter-spacing: .06em;
          box-shadow:
            0 2px 0 rgba(255,245,180,.35) inset,
            0 6px 20px rgba(150,100,0,.28);
          transition: transform .2s, box-shadow .2s;
          border: none;
        }
        .loc-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 0 rgba(255,245,180,.35) inset, 0 10px 28px rgba(150,100,0,.38);
        }
        .loc-btn:active { transform: scale(.97); }

        /* ── SAVE THE DATE ── */
        .loc-std {
          margin: 36px auto 0;
          max-width: 460px;
          padding: 32px 28px;
          border-radius: 16px;
          border: 3.5px solid rgba(185,148,70,.4);
          background: rgba(255,252,244,.85);
          backdrop-filter: blur(8px);
          animation: fadeUp .8s ease both .4s; opacity: 0;
          box-shadow:
            0 2px 0 rgba(255,245,200,.7) inset,
            0 8px 28px rgba(150,100,0,.1);
          position: relative; overflow: hidden;
        }

        /* std top band */
        .loc-std::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a030, transparent);
        }
        .loc-std::after {
          content: '';
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a030, transparent);
        }

        .std-tag {
          font-family: 'Cinzel', serif;
          font-size: clamp(.58rem, 1.9vw, .68rem);
          letter-spacing: .3em;
          color: #9a7020;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 14px;
        }

        .std-date-kh {
          font-family: 'Moul', serif;
          font-size: clamp(1.1rem, 4.5vw, 1.45rem);
          line-height: 1.6;
          margin-bottom: 8px;
          background: linear-gradient(175deg,
            #b8860b 0%, #d4a520 18%, #8b6400 38%,
            #c9a030 54%, #7a5000 70%, #c0941a 84%, #b8860b 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter:
            drop-shadow(0 0 6px rgba(255,200,50,.25))
            drop-shadow(0 2px 8px rgba(0,0,0,.18));
          animation: goldShimmer 3.5s ease-in-out infinite;
        }

        .std-div {
          width: 44px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(185,148,70,.7), transparent);
          margin: 12px auto;
        }

        .std-venue {
          font-family: 'Battambang', serif;
          font-size: clamp(.76rem, 2.8vw, .9rem);
          font-weight: 700;
          color: #4a2e08;
          line-height: 1.8;
          text-shadow: 0 1px 0 rgba(255,255,255,.9), 0 2px 6px rgba(255,255,255,.6);
        }

        .std-time {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(.86rem, 3vw, 1.02rem);
          font-weight: 600;
          color: #7a5010;
          margin-top: 4px;
          text-shadow: 0 1px 0 rgba(255,255,255,.9);
        }

        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes goldShimmer {
          0%,100% { background-position:0% 0%; }
          50%     { background-position:0% 100%; }
        }
      `}</style>

      <section className="loc-section reveal">

        <div className="loc-frame-o" />
        <div className="loc-frame-i" />

        {/* corners */}
        {["lc-tl","lc-tr","lc-bl","lc-br"].map(c => (
          <LocCorner key={c} className={`loc-corner ${c}`} />
        ))}

        {/* petals */}
        {petals.map((p,i) => (
          <PetalSVG key={i} color={p.color} style={{
            left:p.x, top:`-${p.size*2}px`,
            width:p.size, height:p.size*1.35,
            animationDuration:`${p.dur}s`,
            animationDelay:`${p.delay}s`,
            transform:`rotate(${p.rot}deg)`,
          }}/>
        ))}

        <div className="loc-inner">

          <p className="loc-tag">— Join Us —</p>
          <h2 className="loc-title">ទីតាំងមង្គលការ</h2>
          <GoldDivider />

          {/* ── VENUE CARD ── */}
          <div className="loc-card">
            <div className="loc-card-band" />
            <div className="loc-card-body">

              <div className="loc-pin">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
                    fill="#c9a030" opacity=".9"/>
                  <circle cx="12" cy="9" r="2.5" fill="#fffbe0"/>
                </svg>
              </div>

              <p className="loc-venue-name">AEON 3 Mall Meanchey</p>
              <p className="loc-venue-hall">Hall A + B</p>
              <p className="loc-venue-city">ភ្នំពេញ · Phnom Penh, Cambodia</p>

              <div className="loc-card-div">
                <div className="lcd-line" />
                <div className="lcd-gem" />
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 9C5 9 1 6 1 3.2A2.2 2.2 0 0 1 5 2 2.2 2.2 0 0 1 9 3.2C9 6 5 9 5 9Z"
                    fill="#c9a030" opacity=".8"/>
                </svg>
                <div className="lcd-gem" />
                <div className="lcd-line r" />
              </div>

              <a href={mapLink} target="_blank" rel="noopener noreferrer"
                className="loc-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
                    fill="#fffbe0" opacity=".9"/>
                  <circle cx="12" cy="9" r="2.5" fill="#c9a030"/>
                </svg>
                មើលទីតាំងនៅផែនទី
              </a>

            </div>
          </div>

          {/* ── SAVE THE DATE ── */}
          <div className="loc-std">

            <p className="std-tag">✦ Save the Date ✦</p>

            <h3 className="std-date-kh">២១ · មេសា · ២០២៦</h3>

            <div className="std-div" />

            <p className="std-venue">
              AEON 3 Mall Meanchey (AEON III)<br/>
              ហាល A+B · ភ្នំពេញ · Cambodia
            </p>
            <p className="std-time">Beginning at Five O'Clock in the Evening</p>

          </div>

        </div>
      </section>
    </>
  );
}

function LocCorner({ className }) {
  return (
    <svg className={className} viewBox="0 0 76 76" fill="none">
      <path d="M4 72 L4 4 L72 4" stroke="#c9a030" strokeWidth="1.2" fill="none" opacity=".6"/>
      <path d="M9 66 L9 9 L66 9" stroke="#c9a030" strokeWidth=".4" fill="none" opacity=".28" strokeDasharray="3 2"/>
      <circle cx="4" cy="4" r="3.2" fill="#c9a030" opacity=".7"/>
      <path d="M4 4 Q38 14 46 46 Q14 38 4 4Z" fill="#c9a030" opacity=".08"/>
      <path d="M4 4 Q22 32 46 46" stroke="#c9a030" strokeWidth=".7" fill="none" opacity=".35" strokeDasharray="3 2"/>
      <path d="M4 26 Q12 20 20 26 Q12 32 4 26Z" fill="#c9a030" opacity=".48"/>
      <path d="M26 4 Q20 12 26 20 Q32 12 26 4Z" fill="#c9a030" opacity=".48"/>
      <circle cx="24" cy="24" r="1.8" fill="#c9a030" opacity=".35"/>
      <rect x="46" y="46" width="6" height="6" fill="#c9a030" transform="rotate(45 49 49)" opacity=".25"/>
    </svg>
  );
}
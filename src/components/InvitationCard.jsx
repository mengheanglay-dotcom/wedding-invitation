import { useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Moul&family=Battambang:wght@300;400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Cinzel:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .inv-root {
    position: relative;
    width: 100%;
    min-height: 100svh;
    background: #fdf8f0;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* soft warm texture */
  .inv-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 10%, rgba(255,220,180,0.35) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 90%, rgba(240,200,160,0.3) 0%, transparent 55%);
    pointer-events: none;
    z-index: 0;
  }

  /* fixed gold frames */
  .inv-frame-o { position:fixed; inset:8px;  border:1.5px solid rgba(185,148,70,0.6); z-index:10; pointer-events:none; }
  .inv-frame-i { position:fixed; inset:14px; border:.5px  dashed rgba(185,148,70,0.35); z-index:10; pointer-events:none; }

  /* fixed corners */
  .inv-corner { position:fixed; z-index:11; pointer-events:none; width:clamp(72px,16vw,105px); height:clamp(72px,16vw,105px); }
  .inv-corner.tl { top:0; left:0; }
  .inv-corner.tr { top:0; right:0; transform:scaleX(-1); }
  .inv-corner.bl { bottom:0; left:0; transform:scaleY(-1); }
  .inv-corner.br { bottom:0; right:0; transform:scale(-1,-1); }

  /* fixed side florals */
  .inv-side { position:fixed; z-index:11; pointer-events:none; width:clamp(18px,3.5vw,26px); height:clamp(60px,12vw,85px); opacity:.55; }
  .inv-side.left  { left:12px; top:50%; transform:translateY(-50%); }
  .inv-side.right { right:12px; top:50%; transform:translateY(-50%) scaleX(-1); }

  /* fixed butterflies */
  .inv-bfly { position:fixed; z-index:11; pointer-events:none; width:clamp(20px,4vw,28px); height:clamp(20px,4vw,28px); opacity:.6; }
  .inv-bfly.top    { top:14px;    left:50%; transform:translateX(-50%); }
  .inv-bfly.bottom { bottom:14px; left:50%; transform:translateX(-50%); }

  /* falling rose petals */
  .petal { position:fixed; z-index:1; pointer-events:none; animation:petalFall linear infinite; opacity:0; }
  @keyframes petalFall {
    0%   { opacity:0;   transform:translateY(-40px) rotate(0deg) scale(1); }
    8%   { opacity:.75; }
    85%  { opacity:.5; }
    100% { opacity:0;   transform:translateY(105vh) rotate(380deg) scale(.75); }
  }

  /* scrollable content */
  .inv-content {
    position: relative;
    z-index: 3;
    width: 100%;
    max-width: 460px;
    padding: clamp(40px,8vw,60px) clamp(24px,6vw,44px) clamp(52px,10vw,72px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* ── TITLE ── */
  .title-kh {
    font-family: 'Moul', serif;
    font-size: clamp(1.1rem, 4.8vw, 1.5rem);
    line-height: 1.8;
    margin-bottom: 16px;
    background: linear-gradient(175deg,
      #b8860b 0%, #d4a520 20%, #8b6400 40%,
      #c9a030 55%, #7a5000 70%, #c0941a 85%, #b8860b 100%
    );
    background-size: 100% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 1px 3px rgba(150,100,0,.15));
    animation: fadeUp .7s ease both .05s, goldShimmer 3.5s ease-in-out infinite 1s;
    opacity: 0;
  }

  /* ── PARENTS GRID ── */
  .parents-grid {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    gap: 0 10px;
    width: 100%;
    margin-bottom: 4px;
    animation: fadeUp .7s ease both .15s;
    opacity: 0;
  }
  .p-col { display:flex; flex-direction:column; gap:3px; padding:4px 0; }
  .p-col.left  { text-align:right;  align-items:flex-end; }
  .p-col.right { text-align:left;   align-items:flex-start; }
  .p-vline {
    background: linear-gradient(to bottom, transparent, rgba(185,148,70,.5), transparent);
    width:1px; align-self:stretch;
  }
  .p-role {
    font-family: 'Battambang', serif;
    font-size: clamp(0.8rem, 2vw, .7rem);
    font-weight: 300;
    color: #b8922a;
    letter-spacing: .05em;
    line-height: 1.4;
  }
  .p-name {
    font-family: 'Battambang', serif;
    font-size: clamp(1rem, 2.8vw, .88rem);
    font-weight: 700;
    color: #5a3a08;
    line-height: 1.5;
  }

  /* ── DIVIDERS ── */
  .gold-div {
    display: flex; align-items: center; justify-content: center;
    gap: 6px; width: 100%; max-width: 200px;
    margin: 10px auto;
    animation: fadeUp .6s ease both;
    opacity: 0;
  }
  .gd-line   { flex:1; height:.5px; background:linear-gradient(90deg,transparent,rgba(185,148,70,.8)); }
  .gd-line.r { background:linear-gradient(90deg,rgba(185,148,70,.8),transparent); }
  .gd-gem    { width:5px; height:5px; background:#c9a030; transform:rotate(45deg); flex-shrink:0; }
  .gd-heart  { flex-shrink:0; }

  /* ── INVITE LABEL ── */
  .inv-label {
    font-family: 'Battambang', serif;
    font-size: clamp(0.8rem, 2.3vw, .76rem);
    font-weight: 300;
    color: #b8922a;
    letter-spacing: .12em;
    margin-bottom: 8px;
    animation: fadeUp .7s ease both .28s;
    opacity: 0;
  }

  /* ── BODY TEXT ── */
  .body-kh {
    font-family: 'Battambang', serif;
    font-size: clamp(.82rem, 3vw, 1rem);
    font-weight: 300;
    color: #7a5a28;
    line-height: 2.1;
    margin-bottom: 4px;
    animation: fadeUp .7s ease both .32s;
    opacity: 0;
  }
  .body-kh strong { font-weight:700; color:#4a2e08; }

  /* ── GROOM/BRIDE LABEL ROW ── */
  .gb-label-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 8px;
    width: 100%;
    margin-bottom: 2px;
    animation: fadeUp .7s ease both .4s;
    opacity: 0;
  }
  .gb-label-col { display:flex; flex-direction:column; align-items:center; }
  .gb-role {
    font-family: 'Battambang', serif;
    font-size: clamp(.58rem, 2vw, .7rem);
    font-weight: 300;
    color: #b8922a;
    letter-spacing: .06em;
  }

  .center-connector {
    font-family: 'Battambang', serif;
    font-size: clamp(.62rem, 2.2vw, .76rem);
    font-weight: 300;
    color: #b8922a;
    letter-spacing: .1em;
    margin: 2px 0 4px;
    animation: fadeUp .7s ease both .44s;
    opacity: 0;
  }

  /* ── BIG KHMER NAMES ── */
  .big-names-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 8px;
    width: 100%;
    margin-bottom: 10px;
    animation: fadeUp .8s ease both .48s;
    opacity: 0;
  }
  .big-name {
    font-family: 'Moul', serif;
    font-size: clamp(1rem, 4.5vw, 1.4rem);
    line-height: 1.4;
    background: linear-gradient(175deg,
      #b8860b 0%, #d4a520 20%, #8b6400 40%,
      #c9a030 55%, #7a5000 70%, #c0941a 85%, #b8860b 100%
    );
    background-size: 100% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: goldShimmer 3.5s ease-in-out infinite 1.3s;
  }

  /* ── ENGLISH SECTION ── */
  .en-section {
    width: 100%;
    animation: fadeUp .7s ease both .58s;
    opacity: 0;
  }

  .en-parents-grid {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    gap: 0 10px;
    width: 100%;
    margin-bottom: 10px;
  }
  .en-p-col { display:flex; flex-direction:column; gap:1px; padding:4px 0; }
  .en-p-col.left  { text-align:left; }
  .en-p-col.right { text-align:right; }
  .en-p-role {
    font-family: 'Battambang', serif;
    font-size: clamp(.74rem, 1.8vw, .64rem);
    font-weight: 300;
    color: #b8922a;
    letter-spacing: .05em;
  }
  .en-p-name {
    font-family: 'Battambang', serif;
    font-size: clamp(.72rem, 2.2vw, .75rem);
    font-weight: 700;
    color: #4a2e08;
    letter-spacing: .04em;
    line-height: 1.5;
  }

  .cordially {
    font-family: 'Cinzel', serif;
    font-size: clamp(.54rem, 1.9vw, .66rem);
    letter-spacing: .16em;
    color: #9a7828;
    text-transform: uppercase;
    margin: 4px 0 6px;
  }

  .script-names {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: clamp(1.8rem, 5.8vw, 1.9rem);
    font-weight: 600;
    color: #7a4e08;
    letter-spacing: .02em;
    line-height: 1.25;
    margin: 2px 0 8px;
  }
  .script-amp { font-size: clamp(1.1rem,4.5vw,1.5rem); color:#c9a030; margin:0 6px; }

  .date-en {
    font-family: 'Cinzel', serif;
    font-size: clamp(.62rem, 2.2vw, .76rem);
    font-weight: 500;
    letter-spacing: .16em;
    color: #4a2e08;
    text-transform: uppercase;
    margin: 2px 0;
  }
  .date-sub {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: clamp(.85rem, 3.2vw, 1.05rem);
    color: #8a6020;
    margin: 2px 0 8px;
  }
  .venue-label {
    font-family: 'Cinzel', serif;
    font-size: clamp(.54rem, 1.8vw, .64rem);
    letter-spacing: .24em;
    color: #b8922a;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .venue-name {
    font-family: 'Cinzel', serif;
    font-size: clamp(.82rem, 3.3vw, 1.05rem);
    font-weight: 500;
    letter-spacing: .08em;
    color: #3a2208;
    margin-bottom: 2px;
  }
  .venue-hall {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: clamp(.82rem, 3vw, 1rem);
    color: #8a6020;
    margin-bottom: 10px;
  }

  .footer-kh {
    font-family: 'Battambang', serif;
    font-size: clamp(.64rem, 2.3vw, .78rem);
    font-weight: 300;
    color: #9a7828;
    letter-spacing: .06em;
    margin-top: 4px;
  }

  /* map button */
  .map-btn {
    margin-top: 22px;
    padding: 13px 38px;
    background: linear-gradient(135deg, #c9a030 0%, #a07820 100%);
    color: #fffbe0;
    font-family: 'Battambang', serif;
    font-size: clamp(.78rem, 3vw, .92rem);
    font-weight: 700;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    letter-spacing: .06em;
    box-shadow: 0 4px 18px rgba(150,100,0,.25);
    transition: transform .15s, box-shadow .15s;
    animation: fadeUp .8s ease both .88s;
    opacity: 0;
  }
  .map-btn:hover  { transform:translateY(-2px); box-shadow:0 6px 22px rgba(150,100,0,.35); }
  .map-btn:active { transform:scale(.97); }

  @keyframes fadeUp { from{opacity:0;transform:translateY(13px)} to{opacity:1;transform:translateY(0)} }
  @keyframes goldShimmer {
    0%,100% { background-position:0% 0%; }
    50%     { background-position:0% 100%; }
  }
`;

const petals = [
  {x:"6%",  size:16, dur:8,   delay:0,   rot:-18, color:"#f4b8c8"},
  {x:"16%", size:13, dur:10,  delay:1.4, rot:20,  color:"#f0a8be"},
  {x:"28%", size:20, dur:7.5, delay:0.7, rot:-30, color:"#e8a0b8"},
  {x:"42%", size:14, dur:11,  delay:2.1, rot:38,  color:"#f5c0cc"},
  {x:"56%", size:18, dur:7,   delay:0.3, rot:-12, color:"#f0b0c4"},
  {x:"68%", size:12, dur:9.5, delay:2.8, rot:25,  color:"#e8a8bc"},
  {x:"80%", size:17, dur:8.2, delay:1,   rot:-42, color:"#f4bcc8"},
  {x:"91%", size:14, dur:9,   delay:2.5, rot:28,  color:"#f0b4c0"},
  {x:"4%",  size:11, dur:12,  delay:3.8, rot:12,  color:"#eeaac0"},
  {x:"24%", size:15, dur:7.8, delay:4.8, rot:-25, color:"#f5b8c8"},
  {x:"48%", size:10, dur:13,  delay:1.7, rot:16,  color:"#f0a8bc"},
  {x:"74%", size:18, dur:6.8, delay:3.3, rot:-14, color:"#f4bcc4"},
  {x:"87%", size:13, dur:9.8, delay:0.5, rot:40,  color:"#eaaabe"},
  {x:"36%", size:16, dur:8.8, delay:4.2, rot:-28, color:"#f2b0c4"},
  {x:"62%", size:12, dur:10.5,delay:2.3, rot:20,  color:"#f5c0cc"},
];

const PetalSVG = ({ style, color }) => (
  <svg style={style} className="petal" viewBox="0 0 24 32" fill="none">
    <path d="M12 2C18 6 22 14 20 22C18 28 12 30 12 30C12 30 6 28 4 22C2 14 6 6 12 2Z"
      fill={color} opacity=".82"/>
    <path d="M12 4C12 4 12 26 12 29" stroke="rgba(180,80,100,.2)" strokeWidth=".6" fill="none"/>
  </svg>
);

const GoldDiv = ({ delay = "0s", heart = true }) => (
  <div className="gold-div" style={{ animationDelay: delay }}>
    <div className="gd-line" />
    <div className="gd-gem" />
    {heart && (
      <svg className="gd-heart" width="11" height="10" viewBox="0 0 11 10" fill="none">
        <path d="M5.5 9C5.5 9 1 5.8 1 3A2.3 2.3 0 0 1 5.5 1.8 2.3 2.3 0 0 1 10 3C10 5.8 5.5 9 5.5 9Z"
          fill="#c9a030" opacity=".85"/>
      </svg>
    )}
    <div className="gd-gem" />
    <div className="gd-line r" />
  </div>
);

const VLine = () => (
  <div style={{
    background:"linear-gradient(to bottom,transparent,rgba(185,148,70,.5),transparent)",
    width:1, alignSelf:"stretch",
  }}/>
);

const FloralCorner = ({ className }) => (
  <svg className={className} viewBox="0 0 110 110" fill="none">
    <path d="M4 106 L4 4 L106 4" stroke="#c9a030" strokeWidth="1.2" fill="none" opacity=".55"/>
    <path d="M9 100  L9 9 L100 9" stroke="#c9a030" strokeWidth=".4" fill="none" opacity=".28" strokeDasharray="3 2.5"/>
    <circle cx="4" cy="4" r="3.5" fill="#c9a030" opacity=".7"/>
    <path d="M4 4 Q50 18 60 60 Q18 50 4 4Z" fill="#c9a030" opacity=".07"/>
    <path d="M4 4 Q28 42 60 60" stroke="#c9a030" strokeWidth=".7" fill="none" opacity=".32" strokeDasharray="3 2.5"/>
    <path d="M4 32 Q14 25 24 32 Q14 39 4 32Z" fill="#c9a030" opacity=".45"/>
    <path d="M4 48 Q16 38 27 47 Q16 56 4 48Z" fill="#c9a030" opacity=".3"/>
    <path d="M32 4 Q25 14 32 24 Q39 14 32 4Z" fill="#c9a030" opacity=".45"/>
    <path d="M48 4 Q38 16 47 27 Q56 16 48 4Z" fill="#c9a030" opacity=".3"/>
    <path d="M20 20 Q29 14 36 22 Q29 29 22 25" stroke="#c9a030" strokeWidth=".7" fill="none" opacity=".45"/>
    <circle cx="31" cy="31" r="2" fill="#c9a030" opacity=".38"/>
    <circle cx="11" cy="11" r="1.8" fill="#c9a030" opacity=".3"/>
    <rect x="60" y="60" width="7" height="7" fill="#c9a030" transform="rotate(45 63.5 63.5)" opacity=".25"/>
  </svg>
);

const SideFloral = ({ className }) => (
  <svg className={className} viewBox="0 0 28 90" fill="none">
    <path d="M14 5 Q25 20 23 45 Q25 70 14 85 Q3 70 5 45 Q3 20 14 5Z"
      stroke="#c9a030" strokeWidth=".7" fill="none" opacity=".4" strokeDasharray="3 2"/>
    <circle cx="14" cy="5"  r="3.5" fill="#c9a030" opacity=".6"/>
    <circle cx="14" cy="45" r="4.5" fill="#c9a030" opacity=".4"/>
    <circle cx="14" cy="85" r="3.5" fill="#c9a030" opacity=".6"/>
    <path d="M14 24 Q22 30 20 38" stroke="#c9a030" strokeWidth=".6" fill="none" opacity=".4"/>
    <path d="M14 24 Q6 30 8 38"   stroke="#c9a030" strokeWidth=".6" fill="none" opacity=".4"/>
    <path d="M14 66 Q22 60 20 52" stroke="#c9a030" strokeWidth=".6" fill="none" opacity=".4"/>
    <path d="M14 66 Q6 60 8 52"   stroke="#c9a030" strokeWidth=".6" fill="none" opacity=".4"/>
  </svg>
);

const Butterfly = ({ className }) => (
  <svg className={className} viewBox="0 0 28 24" fill="none">
    <path d="M14 12 Q6 4 2 7 Q-1 13 6 16 Q10 17 14 12Z"  fill="#c9a030" opacity=".55"/>
    <path d="M14 12 Q22 4 26 7 Q29 13 22 16 Q18 17 14 12Z" fill="#c9a030" opacity=".45"/>
    <path d="M14 12 Q8 16 6 22 Q11 20 14 14Z"  fill="#c9a030" opacity=".35"/>
    <path d="M14 12 Q20 16 22 22 Q17 20 14 14Z" fill="#c9a030" opacity=".35"/>
    <line x1="14" y1="6" x2="14" y2="20" stroke="#c9a030" strokeWidth=".7"/>
    <circle cx="14" cy="12" r="1.4" fill="#c9a030"/>
  </svg>
);

export default function InvitationCard() {
  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = styles;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  return (
    <div className="inv-root">
      <div className="inv-frame-o" />
      <div className="inv-frame-i" />

      {["tl","tr","bl","br"].map(p => (
        <FloralCorner key={p} className={`inv-corner ${p}`} />
      ))}
      <SideFloral className="inv-side left" />
      <SideFloral className="inv-side right" />
      <Butterfly className="inv-bfly top" />
      <Butterfly className="inv-bfly bottom" />

      {/* falling rose petals */}
      {petals.map((p, i) => (
        <PetalSVG key={i} color={p.color} style={{
          left: p.x, top: `-${p.size * 2}px`,
          width: p.size, height: p.size * 1.35,
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.delay}s`,
          transform: `rotate(${p.rot}deg)`,
        }}/>
      ))}

      <div className="inv-content">

        {/* TITLE */}
        <h1 className="title-kh">សិរីមង្គលអាពាហ៍ពិពាហ៍</h1>

        {/* PARENTS KHMER */}
        <div className="parents-grid">
          <div className="p-col left">
            <span className="p-role">លោក</span>
            <span className="p-name">សយ ស៊ីម</span>
            <span className="p-role" style={{marginTop:5}}>លោកស្រី</span>
            <span className="p-name">សុខ ចាន់ស៊ីណា</span>
          </div>
          <VLine />
          <div className="p-col right">
            <span className="p-role">ឧត្តមសេនីយ៏</span>
            <span className="p-name">ឡាយ សំអឿន</span>
            <span className="p-role" style={{marginTop:5}}>លោកស្រី</span>
            <span className="p-name">ខាយ ស៊ីនួន</span>
          </div>
        </div>

        <GoldDiv delay=".2s" />

        {/* INVITE LABEL */}
        <p className="inv-label">សូមគោរពអញ្ជើញ</p>

        {/* BODY KHMER */}
        <p className="body-kh">
          ឯកឧត្តម លោកជំទាវ លោក លោកស្រី<br/>
          អ្នកនាងកញ្ញា និងភ្ញៀវកិត្តិយស<br/>
          ចូលរួមជាក្តីរីករាយ ក្នុង<br/>
          ពិធីមង្គលអាពាហ៍ពិពាហ៍
        </p>

        <GoldDiv delay=".36s" heart={false} />

        {/* GROOM / BRIDE LABELS */}
        <div className="gb-label-row">
          <div className="gb-label-col">
            <span className="gb-role">កូនប្រុសនាម</span>
          </div>
          <div className="gb-label-col">
            <span className="gb-role">កូនស្រីនាម</span>
          </div>
        </div>

        <p className="center-connector">ជាគូនិង</p>

        {/* BIG KHMER NAMES */}
        <div className="big-names-row">
          <p className="big-name" style={{textAlign:"right", paddingRight:8}}>សយ សុខឃាង</p>
          <p className="big-name" style={{textAlign:"left",  paddingLeft:8}}>ឡាយ សុដាណេ</p>
        </div>

        {/* KHMER DATE / VENUE */}
        <p className="body-kh" style={{animationDelay:".5s"}}>
          នឹងប្រព្រឹត្តទៅនៅ<br/>
          ថ្ងៃ <strong>អង្គារ  </strong> ទី <strong> ២១ មេសា ២០២៦</strong> វេលា​ម៉ោង <strong>៥:០០</strong> ល្ងាច<br/>
          នៅ <strong>AEON III មានជ័យ ផ្លូវ ៦០ម (សាល A+B)</strong><br/>
          រាជធានីភ្នំពេញ ដោយមេត្រី ។ <strong>សូមអរគុណ !!!</strong>
        </p>

        <GoldDiv delay=".6s" />

        {/* ENGLISH SECTION */}
        <div className="en-section">

          <div className="en-parents-grid">
            <div className="en-p-col left">
              <span className="en-p-role">Mr.</span>
              <span className="en-p-name">SOY SIM</span>
              <span className="en-p-role" style={{marginTop:4}}>Mrs.</span>
              <span className="en-p-name">SOK CHANSINA</span>
            </div>
            <VLine />
            <div className="en-p-col right">
              <span className="en-p-role">General</span>
              <span className="en-p-name">LAY SAM OEUN</span>
              <span className="en-p-role" style={{marginTop:4}}>Mrs.</span>
              <span className="en-p-name">KHAY SINOUN</span>
            </div>
          </div>

          <p className="cordially">You are cordially invited to join the wedding reception</p>

          <p className="script-names">
            Soy Sokkheang
            <span className="script-amp"> & </span>
            Lay Sodane
          </p>

          <GoldDiv delay=".7s" heart={false} />

          <p className="date-en">Tuesday · 21<sup>st</sup> April 2026</p>
          <p className="date-sub">Beginning at Five O'Clock in the Evening</p>

          <GoldDiv delay=".76s" heart={false} />

          <p className="venue-label">Venue</p>
          <p className="venue-name">AEON 3 Mall Meanchey</p>
          <p className="venue-hall">Hall A + B</p>

          {/* <p className="footer-kh">ជ្រាបជម្រើក គោរព · សូមអរគុណ !</p> */}

        </div>

        {/* MAP BUTTON
        <button className="map-btn">
          កាត់ចុកកម្ពុជប្រែជីដិត 🗺️
        </button> */}

      </div>
    </div>
  );
}
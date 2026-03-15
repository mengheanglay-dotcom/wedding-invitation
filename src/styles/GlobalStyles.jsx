export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=Nunito:wght@300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --gold: #c9a96e;
        --gold-light: #e8d5a3;
        --gold-dark: #8b6914;
        --blush: #f5e6e0;
        --blush-deep: #e8c4b8;
        --burgundy: #6b2737;
        --burgundy-light: #8b3a4a;
        --ivory: #fdf8f2;
        --dark: #1a0a0f;
        --text: #3d1f28;
      }

      html {
        overflow-x: hidden;
      }

      body {
        background: var(--ivory);
        font-family: 'Nunito', sans-serif;
        color: var(--text);
        overflow-x: hidden;
        width: 100%;
        max-width: 100vw;
      }

      .font-display { font-family: 'Cormorant Garamond', serif; }
      .font-title   { font-family: 'Cinzel', serif; }

      @keyframes petalFall {
        0%   { transform: translateY(-60px) translateX(0px) rotate(0deg); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 0.8; }
        100% { transform: translateY(110vh) translateX(80px) rotate(720deg); opacity: 0; }
      }
      @keyframes sway {
        0%, 100% { transform: translateX(0px); }
        50%       { transform: translateX(20px); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(40px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.85); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(201,169,110,0.3); }
        50%       { box-shadow: 0 0 40px rgba(201,169,110,0.6); }
      }
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        25%       { transform: scale(1.2); }
        50%       { transform: scale(1); }
        75%       { transform: scale(1.1); }
      }

      .animate-fadeUp  { animation: fadeUp 1s ease forwards; }
      .animate-fadeIn  { animation: fadeIn 1.2s ease forwards; }
      .animate-scaleIn { animation: scaleIn 1s ease forwards; }

      .gold-shimmer {
        background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light), var(--gold), var(--gold-dark));
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }

      .count-box {
        background: linear-gradient(145deg, rgba(107,39,55,0.9), rgba(139,58,74,0.8));
        border: 1px solid rgba(201,169,110,0.4);
        border-radius: 8px;
        padding: 20px 28px;
        min-width: 100px;
        text-align: center;
        position: relative;
        overflow: hidden;
        animation: pulse-glow 3s ease-in-out infinite;
      }
      .count-box .number {
        font-family: 'Cinzel', serif;
        font-size: 2.8rem;
        color: #e8d5a3;
        line-height: 1;
      }
      .count-box .label {
        font-size: 0.7rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(232,213,163,0.7);
        margin-top: 6px;
      }

      .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        border: 1px solid rgba(201,169,110,0.2);
      }
      .gallery-item img {
        width: 100%;
        height: 240px;
        object-fit: cover;
        transition: transform 0.6s ease;
        display: block;
      }
      .gallery-item:hover img { transform: scale(1.07); }
      .gallery-item::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(107,39,55,0.4), transparent);
        pointer-events: none;
      }

      .map-wrap {
        border: 1px solid rgba(201,169,110,0.35);
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 8px 40px rgba(107,39,55,0.15);
      }

      .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      .reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .card-ornate {
        background: var(--ivory);
        border: 1px solid rgba(201,169,110,0.3);
        border-radius: 4px;
        position: relative;
      }
      .card-ornate::before { content: '✦'; position: absolute; top: 8px; left: 8px; color: var(--gold); font-size: 10px; }
      .card-ornate::after  { content: '✦'; position: absolute; bottom: 8px; right: 8px; color: var(--gold); font-size: 10px; }

      /* ── Mobile Responsive ── */
      @media (max-width: 600px) {
        .count-box {
          padding: 14px 16px;
          min-width: 70px;
        }
        .count-box .number {
          font-size: 2rem;
        }
        .gallery-item img {
          height: 200px;
        }
      }
    `}</style>
  );
}
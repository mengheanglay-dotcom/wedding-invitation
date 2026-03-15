import { useState, useRef, useEffect } from "react";

export default function Audio({ src }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch {
        const start = () => {
          audio.play();
          document.removeEventListener("click", start);
          document.removeEventListener("touchstart", start);
        };
        document.addEventListener("click", start);
        document.addEventListener("touchstart", start);
      }
    };

    playAudio();
  }, [src]);

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />

      <button onClick={toggleMute} className={`music-btn ${muted ? "muted" : "active"}`}
        aria-label={muted ? "Unmute music" : "Mute music"}>

        {/* outer spinning ring — only when playing */}
        {!muted && <span className="ring ring-outer" />}
        {!muted && <span className="ring ring-inner" />}

        {/* icon */}
        {muted ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5Z" fill="#fff" opacity=".9"/>
            <line x1="23" y1="9" x2="17" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            <line x1="17" y1="9" x2="23" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5Z" fill="#fff" opacity=".9"/>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <path d="M18.5 6a9 9 0 0 1 0 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".6"/>
          </svg>
        )}

        {/* floating notes when playing */}
        {!muted && (
          <>
            <span className="note n1">♪</span>
            <span className="note n2">♫</span>
            <span className="note n3">♩</span>
          </>
        )}
      </button>

      <style>{`
        .music-btn {
          position: fixed;
          bottom: 28px;
          right: 22px;
          z-index: 9999;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(145deg, #f6e9bc, #d4a820, #a07010);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          padding: 0;
          overflow: visible;
          box-shadow:
            0 2px 0 rgba(255,255,255,0.3) inset,
            0 6px 20px rgba(150,100,0,0.35);
          transition: transform .2s, box-shadow .2s;
        }

        .music-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(160deg, rgba(255,255,255,0.25) 0%, transparent 60%);
          pointer-events: none;
        }

        .music-btn:hover {
          transform: scale(1.1);
          box-shadow:
            0 2px 0 rgba(255,255,255,0.3) inset,
            0 8px 28px rgba(150,100,0,0.5);
        }
        .music-btn:active { transform: scale(.94); }

        /* active glow pulse */
        .music-btn.active {
          animation: goldPulse 2.4s ease-in-out infinite;
        }

        /* muted — desaturated */
        .music-btn.muted {
          background: linear-gradient(145deg, #d8d0b8, #a89860, #7a6e48);
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
          animation: none;
        }

        /* spinning rings */
        .ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .ring-outer {
          inset: -8px;
          border: 1.5px dashed rgba(201,160,48,0.55);
          animation: spinCW 5s linear infinite;
        }
        .ring-inner {
          inset: -4px;
          border: 1px solid rgba(201,160,48,0.25);
          animation: spinCCW 3.5s linear infinite;
        }

        /* floating notes */
        .note {
          position: absolute;
          font-size: 11px;
          color: #c9a030;
          pointer-events: none;
          opacity: 0;
          animation: floatNote 2.2s ease-out infinite;
          text-shadow: 0 1px 4px rgba(150,100,0,0.4);
        }
        .n1 { bottom: 56px; left:  2px; animation-delay: 0s; }
        .n2 { bottom: 56px; right: 2px; animation-delay: .75s; }
        .n3 { bottom: 62px; left: 50%; transform: translateX(-50%); animation-delay: 1.5s; }

        @keyframes goldPulse {
          0%,100% { box-shadow: 0 2px 0 rgba(255,255,255,0.3) inset, 0 6px 20px rgba(150,100,0,0.35); }
          50%     { box-shadow: 0 2px 0 rgba(255,255,255,0.3) inset, 0 6px 32px rgba(201,160,48,0.7); }
        }
        @keyframes spinCW  { to { transform: rotate(360deg); } }
        @keyframes spinCCW { to { transform: rotate(-360deg); } }
        @keyframes floatNote {
          0%   { opacity:0; transform:translateY(0) scale(.7); }
          20%  { opacity:.9; }
          100% { opacity:0; transform:translateY(-26px) scale(1.1); }
        }
      `}</style>
    </>
  );
}
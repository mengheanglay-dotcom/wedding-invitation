import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Audio({ src }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    const play = async () => {
      try {
        await audio.play();
      } catch {
        const start = () => {
          audio.play();
          document.removeEventListener("click", start);
          document.removeEventListener("touchstart", start);
        };
        document.addEventListener("click", start, { once: true });
        document.addEventListener("touchstart", start, { once: true });
      }
    };

    play();
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />

      {createPortal(
        <>
          <style>{`
            .music-btn {
              position: fixed !important;
              bottom: calc(20px + env(safe-area-inset-bottom)) !important;
              right: 20px !important;
              z-index: 2147483647 !important;

              width: 56px;
              height: 56px;
              border-radius: 50%;
              border: none;

              display: flex;
              align-items: center;
              justify-content: center;

              background: linear-gradient(145deg, #f6e9bc, #d4a820, #a07010);
              box-shadow:
                0 2px 0 rgba(255,255,255,0.25) inset,
                0 8px 24px rgba(150,100,0,0.4);

              cursor: pointer;
              overflow: visible;

              transform: translateZ(0);
              will-change: transform;
              backface-visibility: hidden;
              transition: transform .18s, box-shadow .18s;

              -webkit-tap-highlight-color: transparent;
              touch-action: manipulation;
            }

            /* Glass sheen */
            .music-btn::before {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: 50%;
              background: linear-gradient(150deg, rgba(255,255,255,0.28) 0%, transparent 55%);
              pointer-events: none;
            }

            /* Outer dashed ring — only when playing */
            .music-btn.playing::after {
              content: '';
              position: absolute;
              inset: -7px;
              border-radius: 50%;
              border: 1.5px dashed rgba(201,160,48,0.5);
              animation: spinRing 8s linear infinite;
              pointer-events: none;
            }

            /* Soft glow pulse — only when playing */
            .music-btn.playing .glow {
              position: absolute;
              inset: -10px;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(212,168,32,0.3) 0%, transparent 70%);
              animation: glowPulse 2.8s ease-in-out infinite;
              pointer-events: none;
            }

            /* Floating note — only when playing */
            .music-btn.playing .note {
              position: absolute;
              bottom: 52px;
              left: 50%;
              font-size: 13px;
              color: #d4a820;
              opacity: 0;
              pointer-events: none;
              animation: floatNote 3s ease-out infinite;
              text-shadow: 0 1px 6px rgba(150,100,0,0.5);
            }

            .music-btn.muted {
              background: linear-gradient(145deg, #d8d0b8, #a89860, #7a6e48);
              box-shadow: 0 4px 14px rgba(0,0,0,0.2);
            }
            .music-btn.muted::after { display: none; }

            .music-btn:active {
              transform: translateZ(0) scale(0.92);
              box-shadow: 0 3px 10px rgba(150,100,0,0.3);
            }

            @keyframes spinRing {
              to { transform: rotate(360deg); }
            }
            @keyframes glowPulse {
              0%, 100% { opacity: 0.4; transform: scale(1); }
              50%       { opacity: 1;   transform: scale(1.08); }
            }
            @keyframes floatNote {
              0%   { opacity: 0;   transform: translateX(-50%) translateY(0)     scale(0.8); }
              20%  { opacity: 0.9; }
              100% { opacity: 0;   transform: translateX(-50%) translateY(-22px) scale(1.1); }
            }
          `}</style>

          <button
            className={`music-btn ${muted ? "muted" : "playing"}`}
            onClick={toggle}
            aria-label={muted ? "Unmute music" : "Mute music"}
          >
            {/* Glow layer */}
            {!muted && <span className="glow" />}

            {/* Floating note */}
            {!muted && <span className="note">♪</span>}

            {/* Icon */}
            {muted ? (
              /* Muted — speaker with X */
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 5L6 9H2v6h4l5 4V5Z"
                  fill="#fff"
                  opacity=".9"
                />
                <line x1="22" y1="9" x2="16" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="9" x2="22" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              /* Playing — speaker with two arcs */
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 5L6 9H2v6h4l5 4V5Z"
                  fill="#fff"
                  opacity=".9"
                />
                <path
                  d="M15.5 8.5a5 5 0 0 1 0 7"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M18.5 6a9 9 0 0 1 0 12"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity=".55"
                />
              </svg>
            )}
          </button>
        </>,
        document.body
      )}
    </>
  );
}
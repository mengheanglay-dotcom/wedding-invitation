import { useEffect } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Flowers from "./components/Flowers";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import Footer from "./components/Footer";
import InvitationCard from "./components/InvitationCard";
import ThankYou from "./components/ThankYou";
import WeddingFlow from "./components/WeddingFlow";
import Audio from "./components/Audio";

import weddingSong from "./assets/Bomnorng.mp3";

/* ── Optimized Scroll Reveal ── */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target); // stop observing once visible
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  return (
    <>
      <GlobalStyles />

      <div
        style={{
          position: "relative",
          contain: "layout paint style"
        }}
      >
        <Flowers />

        {/* background music */}
        <Audio src={weddingSong} />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            transform: "translateZ(0)"
          }}
        >
          <Hero />
          <InvitationCard />
          <WeddingFlow />
          <Gallery />
          <Location />
          <Countdown />
          <ThankYou />
          <Footer />
        </div>
      </div>
    </>
  );
}
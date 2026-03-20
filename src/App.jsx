import { useEffect, useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import Flowers from "./components/Flowers";
import Audio from "./components/Audio";

import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import Footer from "./components/Footer";
import InvitationCard from "./components/InvitationCard";
import ThankYou from "./components/ThankYou";
import WeddingFlow from "./components/WeddingFlow";

import weddingSong from "./assets/Bomnorng.mp3";

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      <GlobalStyles />

      {/* 🔊 ALWAYS OUTSIDE EVERYTHING */}
      <Audio src={weddingSong} />

      {/* 🌸 Disable heavy animation on mobile */}
      {!isMobile && <Flowers />}

      {/* 📄 MAIN CONTENT (NO z-index here!) */}
      <main>
        <Hero />
        <InvitationCard />
        <WeddingFlow />
        <Gallery />
        <Location />
        <Countdown />
        <ThankYou />
        <Footer />
      </main>
    </>
  );
}
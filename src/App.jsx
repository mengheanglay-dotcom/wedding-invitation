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

// ── Import the mp3 as a Vite asset module ──
import weddingSong from "./assets/Bomnorng.mp3";

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  return (
    <>
      <GlobalStyles />
      <div style={{ position: "relative" }}>
        <Flowers />

        {/* Pass the imported module, not a string path */}
        <Audio src={weddingSong} />

        <div style={{ position: "relative", zIndex: 1 }}>
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
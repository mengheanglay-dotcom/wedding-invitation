import {
  Users,
  ScrollText,
  Flower,
  HandHeart,
  Theater,
  Scissors,
  PartyPopper,
  Utensils,
  Wine,
  Heart
} from "lucide-react";
export default function Footer() {
  return (
    <footer style={{
      background: "#1a0a0f",
      padding: "48px 24px",
      textAlign: "center",
    }}>
      <h3 className="font-display gold-shimmer" style={{
        fontSize: "1.8rem", fontWeight: 300, marginBottom: "8px",
      }}>
        Sokkheang & Sodane
      </h3>

      <p style={{
        fontSize: "0.7rem", letterSpacing: "0.3em",
        color: "rgba(201,169,110,0.5)", textTransform: "uppercase",
      }}>
        April 21, 2026
      </p>

      <div style={{ margin: "20px auto", width: "40px", height: "1px", background: "rgba(201,169,110,0.3)" }} />

      <p className="font-display" style={{
        fontStyle: "italic", color: "rgba(232,213,163,0.4)", fontSize: "0.9rem",
      }}>
        With love & gratitude ♥
      </p>

      {/* ── Developer Credit ── */}
      <p style={{
        fontSize: "0.65rem",
        color: "rgba(255, 255, 255, 0.35)",
        marginTop: "28px",
        alignItems: "flex-end"
      }}>
       Crafted With <Heart size={10}/>  by Lay Mengheang
      </p>
    </footer>
  );
}
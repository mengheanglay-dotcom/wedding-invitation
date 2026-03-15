export default function GoldDivider() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "16px",
      justifyContent: "center", margin: "20px auto", maxWidth: "300px",
    }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #c9a96e)" }} />
      <span style={{ color: "#c9a96e", fontSize: "12px" }}>✦</span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #c9a96e, transparent)" }} />
    </div>
  );
}
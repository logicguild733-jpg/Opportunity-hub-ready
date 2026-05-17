export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Dashboard 🚀</h1>

      {/* STATS SECTION */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        
        <div style={cardStyle}>
          <h3>Total Leads</h3>
          <p>0</p>
        </div>

        <div style={cardStyle}>
          <h3>Active Skills</h3>
          <p>0</p>
        </div>

        <div style={cardStyle}>
          <h3>Referrals</h3>
          <p>0</p>
        </div>

        <div style={cardStyle}>
          <h3>Earnings</h3>
          <p>$0</p>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div style={{ marginTop: 40 }}>
        <h2>Recent Activity</h2>
        <p>No activity yet...</p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#f5f5f5",
  padding: 20,
  borderRadius: 10,
  width: 200,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

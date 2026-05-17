import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [leadsCount, setLeadsCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    setLeadsCount(count || 0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard 🚀</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>

        <div style={cardStyle}>
          <h2>Total Leads</h2>
          <p style={numberStyle}>{leadsCount}</p>
        </div>

        <div style={cardStyle}>
          <h2>Active Users</h2>
          <p style={numberStyle}>Coming soon</p>
        </div>

        <div style={cardStyle}>
          <h2>Revenue</h2>
          <p style={numberStyle}>Coming soon</p>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  padding: 20,
  border: "1px solid #ddd",
  borderRadius: 10,
  width: 200,
  background: "#fff",
};

const numberStyle = {
  fontSize: 28,
  fontWeight: "bold",
  marginTop: 10,
};

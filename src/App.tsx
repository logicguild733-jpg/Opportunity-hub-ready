import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*");

      if (error) {
        console.error("ERROR:", error);
        return;
      }

      setLeads(data || []);
    };

    fetchLeads();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Leads</h1>

      {leads.length === 0 && <p>No leads found</p>}

      {leads.map((lead, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          {/* Show ALL fields dynamically */}
          {Object.entries(lead).map(([key, value]) => (
            <p key={key}>
              <b>{key}:</b> {String(value)}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;

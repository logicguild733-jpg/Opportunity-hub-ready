import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      setLeads(data || []);
    };

    fetchLeads();
  }, []);

  // SIMPLE FILTER LOGIC
  const filteredLeads = leads.filter((lead) => {
    if (filter === "all") return true;
    return (lead.lead_quality || "").toLowerCase() === filter;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Leads</h1>

      {/* BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("high")}>High</button>
        <button onClick={() => setFilter("medium")}>Medium</button>
        <button onClick={() => setFilter("low")}>Low</button>
      </div>

      {/* DATA */}
      {filteredLeads.map((lead) => (
        <div
          key={lead.id}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          <h3>{lead.client_name || lead.name || "No Name"}</h3>

          <p><b>Service:</b> {lead.service_needed}</p>
          <p><b>Budget:</b> {lead.budget}</p>
          <p><b>City:</b> {lead.city}</p>
          <p><b>Quality:</b> {lead.lead_quality}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

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
        console.error(error);
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

      {leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 12,
            borderRadius: 10,
            background: "#fff",
          }}
        >
          <h3>{lead.client_name || lead.name || "No Name"}</h3>

          <p><b>Service:</b> {lead.service_needed || "N/A"}</p>

          <p><b>Budget:</b> {lead.budget || "N/A"}</p>

          <p><b>Location:</b> {lead.city || ""} {lead.country || ""}</p>

          <p><b>Status:</b> {lead.status}</p>

          <p><b>Quality:</b> {lead.lead_quality || "N/A"}</p>

          <p><b>Description:</b> {lead.description || "N/A"}</p>

          <p><b>Email:</b> {lead.client_email || "N/A"}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

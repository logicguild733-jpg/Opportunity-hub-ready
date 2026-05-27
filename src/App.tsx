import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);

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
            padding: 12,
            marginBottom: 10,
          }}
        >
          <h3>{lead.title}</h3>
          <p>{lead.country}</p>
          <p>{lead.type}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

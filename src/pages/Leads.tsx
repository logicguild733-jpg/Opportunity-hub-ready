import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Leads 🚀</h1>

      {loading ? (
        <p>Loading leads...</p>
      ) : leads.length === 0 ? (
        <p>No leads found in database</p>
      ) : (
        leads.map((lead) => (
          <div
            key={lead.id}
            style={{
              padding: 12,
              marginBottom: 10,
              border: "1px solid #ddd",
              borderRadius: 8,
              background: "#fff",
            }}
          >
            <h3>{lead.title}</h3>
            <p>{lead.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

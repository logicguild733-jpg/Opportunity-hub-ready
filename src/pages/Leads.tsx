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
      .select("*");

    console.log("SUPABASE DATA:", data);
    console.log("SUPABASE ERROR:", error);

    if (error) {
      console.error(error);
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Fresh Leads 🚀</h1>

      <p>Total Leads: {leads.length}</p>

      <pre
        style={{
          background: "#f4f4f4",
          padding: 10,
          borderRadius: 10,
          overflow: "auto",
        }}
      >
        {JSON.stringify(leads, null, 2)}
      </pre>

      {loading ? (
        <p>Loading leads...</p>
      ) : leads.length === 0 ? (
        <p>No leads found in database</p>
      ) : (
        leads.map((lead) => (
          <div
            key={lead.id}
            style={{
              padding: 15,
              marginBottom: 12,
              border: "1px solid #ddd",
              borderRadius: 10,
              background: "#fff",
              color: "#000",
            }}
          >
            <h2>{lead.name}</h2>

            <p>
              <strong>Email:</strong> {lead.email}
            </p>

            <p>
              <strong>Phone:</strong> {lead.phone}
            </p>

            <p>
              <strong>Company:</strong> {lead.company}
            </p>

            <p>
              <strong>Status:</strong> {lead.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

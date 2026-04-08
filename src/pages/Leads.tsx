import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .limit(15);

    if (error) {
      console.error("Supabase error:", error);
    } else {
      setLeads(data || []);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leads Page 📋</h1>
      {leads.length === 0 ? (
        <p>No leads found</p>
      ) : (
        leads.map((lead, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <h3>{lead.title}</h3>
            <p>{lead.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

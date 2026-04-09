// src/pages/Leads.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import LeadCard from "../LeadCard";
const leadsEmptyImg = "https://via.placeholder.com/300?text=No+Leads";

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("id", { ascending: false }) // newest first
        .limit(15);

      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      console.error("Supabase fetch error:", err.message);
      setLeads([]);
      setErrorMsg("Failed to fetch leads. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
      <h1>Leads 📋</h1>

      {loading ? (
        <p>Loading leads...</p>
      ) : errorMsg ? (
        <p style={{ color: "red" }}>{errorMsg}</p>
      ) : leads.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <img
            src={leadsEmptyImg}
            alt="No leads"
            style={{ maxWidth: "300px" }}
          />
          <p>No leads found</p>
        </div>
      ) : (
        leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
      )}
    </div>
  );
}

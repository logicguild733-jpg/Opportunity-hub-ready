import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLeads();
  }, [filter, countryFilter, serviceFilter]);

  const getLeads = async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ ABSOLUTE MINIMAL QUERY (NO FILTER THAT CAN HIDE DATA)
      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      // Optional filters (only applied AFTER we confirm data works)
      if (filter !== "all") {
        query = query.eq("lead_quality", filter);
      }

      if (countryFilter !== "all") {
        query = query.eq("country", countryFilter);
      }

      if (serviceFilter !== "all") {
        query = query.eq("service_needed", serviceFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Supabase ERROR:", error);
        setError(error.message);
        setLeads([]);
        return;
      }

      console.log("✅ SUPABASE LEADS:", data);

      setLeads(data || []);
    } catch (err: any) {
      console.error("❌ Unexpected ERROR:", err);
      setError(err.message || "Unexpected error");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // SAFE DROPDOWNS (never crash even if leads empty)
  const countries = [
    "all",
    ...new Set(leads.map((l) => l.country).filter(Boolean)),
  ];

  const services = [
    "all",
    ...new Set(leads.map((l) => l.service_needed).filter(Boolean)),
  ];

  return (
    <div
      style={{
        background: "#0f0f10",
        minHeight: "100vh",
        color: "#ffffff",
        fontFamily: "sans-serif",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 20 }}>Supabase Leads</h1>

        {/* DEBUG INFO PANEL */}
        <div style={{ marginBottom: 10, color: "#a1a1aa" }}>
          <p>Leads Count: {leads.length}</p>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>

        {/* FILTERS */}
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {/* QUALITY */}
          {["all", "high", "medium", "low"].map((q) => (
            <button
              key={q}
              onClick={() => setFilter(q)}
              style={{
                background: filter === q ? "#ffffff" : "#1f1f23",
                color: filter === q ? "#000" : "#fff",
                border: "1px solid #2a2a2e",
                padding: "6px 12px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {q.toUpperCase()}
            </button>
          ))}

          {/* COUNTRY */}
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            style={{
              background: "#1f1f23",
              color: "#fff",
              border: "1px solid #2a2a2e",
              padding: 6,
              borderRadius: 8,
            }}
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* SERVICE */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            style={{
              background: "#1f1f23",
              color: "#fff",
              border: "1px solid #2a2a2e",
              padding: 6,
              borderRadius: 8,
            }}
          >
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ color: "#a1a1aa" }}>Loading leads from Supabase...</div>
        )}

        {/* EMPTY STATE */}
        {!loading && leads.length === 0 && !error && (
          <div style={{ color: "#a1a1aa" }}>
            <h3>No leads found</h3>
            <p>
              Either table is empty OR Supabase RLS is blocking access.
            </p>
          </div>
        )}

        {/* LEADS LIST */}
        {leads.map((lead) => (
          <div
            key={lead.id}
            style={{
              background: "#161618",
              border: "1px solid #2a2a2e",
              padding: 16,
              marginBottom: 12,
              borderRadius: 14,
            }}
          >
            <h3>{lead.client_name || "No Name"}</h3>

            <p>
              Service: <b>{lead.service_needed}</b>
            </p>

            <p>
              Budget: <b>{lead.budget}</b>
            </p>

            <p>
              Location: {lead.city}, {lead.country}
            </p>

            <p>
              Quality: <b>{lead.lead_quality}</b>
            </p>

            <p style={{ color: "#71717a", fontSize: 12 }}>
              {lead.created_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  useEffect(() => {
    getLeads();
  }, [filter, countryFilter, serviceFilter]);

  const getLeads = async () => {
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - 72);

    let query = supabase
      .from("leads")
      .select("*")
      .gte("created_at", cutoff.toISOString())
      .order("created_at", { ascending: false });

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
      console.error(error);
      return;
    }

    setLeads(data || []);
  };

  const countries = ["all", ...new Set(leads.map(l => l.country).filter(Boolean))];
  const services = ["all", ...new Set(leads.map(l => l.service_needed).filter(Boolean))];

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
        <h1 style={{ marginBottom: 20 }}>Leads</h1>

        {/* FILTERS */}
        <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
          
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
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* SERVICE */}
          <select
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
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* EMPTY STATE */}
        {leads.length === 0 ? (
          <div style={{ color: "#a1a1aa" }}>
            <h3>No fresh leads</h3>
            <p>Try changing filters or wait for new ones.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              style={{
                background: "#161618",
                border: "1px solid #2a2a2e",
                padding: 16,
                marginBottom: 12,
                borderRadius: 14,
                transition: "0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#3f3f46")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#2a2a2e")
              }
            >
              <h3 style={{ marginBottom: 8 }}>
                {lead.client_name || "No Name"}
              </h3>

              <p style={{ color: "#a1a1aa" }}>
                Service: <span style={{ color: "#fff" }}>{lead.service_needed}</span>
              </p>

              <p style={{ color: "#a1a1aa" }}>
                Budget: <span style={{ color: "#fff" }}>{lead.budget}</span>
              </p>

              <p style={{ color: "#71717a" }}>
                {lead.city}, {lead.country}
              </p>

              <p style={{ color: "#a1a1aa" }}>
                Quality: <span style={{ color: "#fff" }}>{lead.lead_quality}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

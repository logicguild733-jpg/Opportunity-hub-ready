import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

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

  // AUTO GET COUNTRIES & SERVICES
  const countries = ["all", ...new Set(leads.map(l => l.country).filter(Boolean))];
  const services = ["all", ...new Set(leads.map(l => l.service_needed).filter(Boolean))];

  // FILTER LOGIC
  const filteredLeads = leads.filter((lead) => {
    if (filter !== "all") {
      if ((lead.lead_quality || "").toLowerCase() !== filter) {
        return false;
      }
    }

    if (countryFilter !== "all") {
      if (lead.country !== countryFilter) {
        return false;
      }
    }

    if (serviceFilter !== "all") {
      if (lead.service_needed !== serviceFilter) {
        return false;
      }
    }

    return true;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Leads</h1>

      {/* QUALITY FILTER */}
      <div style={{ marginBottom: 15 }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("high")}>High</button>
        <button onClick={() => setFilter("medium")}>Medium</button>
        <button onClick={() => setFilter("low")}>Low</button>
      </div>

      {/* COUNTRY FILTER */}
      <div style={{ marginBottom: 15 }}>
        <b>Country: </b>
        <select onChange={(e) => setCountryFilter(e.target.value)}>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* SERVICE FILTER */}
      <div style={{ marginBottom: 20 }}>
        <b>Service: </b>
        <select onChange={(e) => setServiceFilter(e.target.value)}>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* LEADS */}
      {filteredLeads.map((lead) => (
        <div
          key={lead.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 12,
            borderRadius: 10,
          }}
        >
          <h3>{lead.client_name || "No Name"}</h3>

          <p><b>Service:</b> {lead.service_needed}</p>
          <p><b>Budget:</b> {lead.budget}</p>
          <p><b>City:</b> {lead.city}</p>
          <p><b>Country:</b> {lead.country}</p>
          <p><b>Quality:</b> {lead.lead_quality}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type TabType = "demand" | "supply" | "saas";

export default function App() {
  const [tab, setTab] = useState<TabType>("demand");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    let table = "";

    // 🔥 FIXED SINGLE SOURCE SYSTEM
    if (tab === "demand") table = "demand_leads";
    if (tab === "supply") table = "supply_leads";
    if (tab === "saas") table = "saas_leads";

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      setError(error.message);
      setData([]);
    } else {
      setData(data || []);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🚀 Opportunity Hub</h1>

      {/* 🔵 TABS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setTab("demand")}>
          Demand Leads
        </button>

        <button onClick={() => setTab("supply")}>
          Supply Jobs
        </button>

        <button onClick={() => setTab("saas")}>
          SaaS Leads
        </button>
      </div>

      {/* 🔥 STATUS */}
      <div style={{ marginBottom: 10 }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && <p>Total: {data.length}</p>}
      </div>

      {/* 🧠 EMPTY STATE (IMPORTANT BUSINESS LOGIC) */}
      {!loading && data.length === 0 && (
        <div style={{ padding: 20, border: "1px solid #ddd" }}>
          <h3>No leads found</h3>

          {tab === "demand" && (
            <div>
              <p>Try:</p>
              <ul>
                <li>Change skill or country filter</li>
                <li>Check Supply Jobs</li>
                <li>Become SaaS reseller (earn commission)</li>
              </ul>
            </div>
          )}

          {tab === "supply" && (
            <div>
              <p>No jobs available.</p>
              <ul>
                <li>Check Demand Leads</li>
                <li>Apply for SaaS opportunities</li>
              </ul>
            </div>
          )}

          {tab === "saas" && (
            <div>
              <p>No SaaS leads available.</p>
              <ul>
                <li>Invite businesses</li>
                <li>Try Demand Leads</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 📦 LEADS LIST */}
      <div style={{ marginTop: 20 }}>
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            {/* Universal display */}
            <h3>
              {item.client_name ||
                item.company_name ||
                item.business_name ||
                "No Title"}
            </h3>

            <p>{item.description}</p>

            {item.skill && <p>Skill: {item.skill}</p>}
            {item.required_skill && <p>Required: {item.required_skill}</p>}
            {item.need_type && <p>Need: {item.need_type}</p>}

            <small>{item.country || "Global"}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

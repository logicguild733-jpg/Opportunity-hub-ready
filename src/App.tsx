import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type TabType = "demand" | "supply" | "saas";

export default function App() {
  const [tab, setTab] = useState<TabType>("demand");

  const [data, setData] = useState<any[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState("all");

  useEffect(() => {
    initialize();
  }, [tab]);

  async function initialize() {
    await loadUserSkills();
    await fetchData();
  }

  async function loadUserSkills() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUserSkills([]);
      return;
    }

    const { data, error } = await supabase
      .from("user_skills")
      .select("skill")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    setUserSkills(
      (data || []).map((item) =>
        String(item.skill).toLowerCase()
      )
    );
  }

  async function fetchData() {
    setLoading(true);
    setError(null);

    let table = "demand_leads";

    if (tab === "supply") {
      table = "supply_leads";
    }

    if (tab === "saas") {
      table = "saas_leads";
    }

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError(error.message);
      setData([]);
    } else {
      setData(data || []);
    }

    setLoading(false);
  }

  const filteredData = data.filter((item) => {
    let leadSkill = "";

    if (tab === "demand") {
      leadSkill = item.skill_needed || "";
    }

    if (tab === "supply") {
      leadSkill = item.required_skill || "";
    }

    if (tab === "saas") {
      leadSkill = item.niche || "";
    }

    const skillMatch =
      userSkills.length === 0 ||
      userSkills.some((skill) =>
        leadSkill.toLowerCase().includes(skill)
      );

    const countryMatch =
      selectedCountry === "all" ||
      item.country === selectedCountry;

    return skillMatch && countryMatch;
  });

  const tabStyle = (active: boolean) => ({
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: active ? "#6366f1" : "#1f2937",
    color: "white",
    fontWeight: 600,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            marginBottom: 5,
            fontSize: 34,
          }}
        >
          🚀 Opportunity Hub
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: 25,
          }}
        >
          Earn First. Pay Later.
        </p>

        <div
          style={{
            marginBottom: 20,
            padding: 12,
            background: "#1e293b",
            borderRadius: 10,
          }}
        >
          <strong>My Skills:</strong>{" "}
          {userSkills.length > 0
            ? userSkills.join(", ")
            : "No skills selected"}
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <button
            style={tabStyle(tab === "demand")}
            onClick={() => setTab("demand")}
          >
            Demand Leads
          </button>

          <button
            style={tabStyle(tab === "supply")}
            onClick={() => setTab("supply")}
          >
            Supply Jobs
          </button>

          <button
            style={tabStyle(tab === "saas")}
            onClick={() => setTab("saas")}
          >
            SaaS Leads
          </button>
        </div>

        <select
          value={selectedCountry}
          onChange={(e) =>
            setSelectedCountry(e.target.value)
          }
          style={{
            padding: 12,
            borderRadius: 10,
            background: "#1e293b",
            color: "white",
            border: "1px solid #334155",
            marginBottom: 20,
          }}
        >
          <option value="all">All Countries</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>UAE</option>
          <option>Saudi Arabia</option>
          <option>Pakistan</option>
        </select>

        <div
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            padding: 15,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          {loading && (
            <p>Loading opportunities...</p>
          )}

          {error && (
            <p style={{ color: "#ef4444" }}>
              {error}
            </p>
          )}

          {!loading && !error && (
            <p style={{ color: "#cbd5e1" }}>
              Opportunities Found:{" "}
              {filteredData.length}
            </p>
          )}
        </div>

        {!loading &&
          filteredData.length === 0 && (
            <div
              style={{
                background: "#111827",
                border: "1px solid #1f2937",
                padding: 20,
                borderRadius: 12,
                marginBottom: 20,
              }}
            >
              <h3>
                No matching opportunities right now
              </h3>

              <p>
                Try:
              </p>

              <ul>
                <li>Expand country filters</li>
                <li>Add more skills</li>
                <li>Check Supply Jobs</li>
                <li>Explore SaaS Leads</li>
              </ul>

              <p>
                More skills = more earning
                opportunities.
              </p>
            </div>
          )}

        <div
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          {filteredData.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 14,
                padding: 18,
              }}
            >
              <h3>
                {item.title ||
                  item.company_name ||
                  item.name ||
                  item.client_name ||
                  "Opportunity"}
              </h3>

              <p>{item.description}</p>

              <p>
                🌍 {item.country || "Global"}
              </p>

              {item.skill_needed && (
                <p>
                  <strong>Skill Needed:</strong>{" "}
                  {item.skill_needed}
                </p>
              )}

              {item.required_skill && (
                <p>
                  <strong>Required Skill:</strong>{" "}
                  {item.required_skill}
                </p>
              )}

              {item.niche && (
                <p>
                  <strong>Niche:</strong>{" "}
                  {item.niche}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                }

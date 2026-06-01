import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type TabType = "demand" | "supply" | "saas";

export default function App() {
  const [tab, setTab] = useState<TabType>("demand");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  useEffect(() => {
    fetchData();
  }, [tab]);

  async function fetchData() {
    setLoading(true);
    setError(null);

    let table = "demand_leads";

    if (tab === "supply") table = "supply_leads";
    if (tab === "saas") table = "saas_leads";

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
    const skillValue =
      item.skill ||
      item.required_skill ||
      "";

    const skillMatch =
      selectedSkill === "all" ||
      skillValue
        .toLowerCase()
        .includes(selectedSkill.toLowerCase());

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
        fontFamily:
          "Inter, system-ui, sans-serif",
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

        {/* Tabs */}

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

        {/* Filters */}

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <select
            value={selectedSkill}
            onChange={(e) =>
              setSelectedSkill(e.target.value)
            }
            style={{
              padding: 12,
              borderRadius: 10,
              background: "#1e293b",
              color: "white",
              border:
                "1px solid #334155",
            }}
          >
            <option value="all">
              All Skills
            </option>

            <option>Math</option>
            <option>Sociology</option>
            <option>Psychology</option>
            <option>Economics</option>

            <option>Arabic</option>
            <option>English</option>
            <option>Urdu</option>
            <option>French</option>

            <option>Tajweed</option>
            <option>Tafseer</option>
            <option>Hadith</option>

            <option>Career Coach</option>
            <option>Business Coach</option>

            <option>Graphic Design</option>
            <option>SEO</option>
            <option>WordPress</option>
          </select>

          <select
            value={selectedCountry}
            onChange={(e) =>
              setSelectedCountry(
                e.target.value
              )
            }
            style={{
              padding: 12,
              borderRadius: 10,
              background: "#1e293b",
              color: "white",
              border:
                "1px solid #334155",
            }}
          >
            <option value="all">
              All Countries
            </option>

            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>Norway</option>
            <option>Finland</option>

            <option>UAE</option>
            <option>Qatar</option>
            <option>Saudi Arabia</option>

            <option>Pakistan</option>
            <option>India</option>
            <option>Bangladesh</option>
          </select>
        </div>

        {/* Status */}

        <div
          style={{
            background: "#111827",
            border:
              "1px solid #1f2937",
            padding: 15,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          {loading && (
            <p>
              Loading opportunities...
            </p>
          )}

          {error && (
            <p
              style={{
                color: "#ef4444",
              }}
            >
              {error}
            </p>
          )}

          {!loading && !error && (
            <p
              style={{
                color: "#cbd5e1",
              }}
            >
              Opportunities Found:{" "}
              {filteredData.length}
            </p>
          )}
        </div>

        {/* Empty State */}

        {!loading &&
          filteredData.length === 0 && (
            <div
              style={{
                background:
                  "#111827",
                border:
                  "1px solid #1f2937",
                padding: 20,
                borderRadius: 12,
              }}
            >
              <h3>
                No opportunities
                matched your filters
              </h3>

              <p>
                Expand your skills or
                country selection.
              </p>

              <ul>
                <li>
                  Check Demand Leads
                </li>
                <li>
                  Check Supply Jobs
                </li>
                <li>
                  Explore SaaS Leads
                </li>
                <li>
                  Add more skills to
                  increase matching
                </li>
              </ul>

              <p>
                More skills = more
                opportunities.
              </p>
            </div>
          )}

        {/* Leads */}

        <div
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          {filteredData.map(
            (item: any) => (
              <div
                key={item.id}
                style={{
                  background:
                    "#111827",
                  border:
                    "1px solid #1f2937",
                  borderRadius: 14,
                  padding: 18,
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.25)",
                }}
              >
                <h3>
                  {item.title ||
                    item.client_name ||
                    item.company_name ||
                    item.business_name ||
                    "Opportunity"}
                </h3>

                <p>
                  {item.description}
                </p>

                {item.skill && (
                  <p>
                    <strong>
                      Skill:
                    </strong>{" "}
                    {item.skill}
                  </p>
                )}

                {item.required_skill && (
                  <p>
                    <strong>
                      Required:
                    </strong>{" "}
                    {
                      item.required_skill
                    }
                  </p>
                )}

                {item.need_type && (
                  <p>
                    <strong>
                      Need:
                    </strong>{" "}
                    {item.need_type}
                  </p>
                )}

                <p
                  style={{
                    color:
                      "#94a3b8",
                  }}
                >
                  🌍{" "}
                  {item.country ||
                    "Global"}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type TabType = "demand" | "supply" | "saas";

const ALL_SKILLS = [
  "Math","Science","Chemistry","Biology","Economics","Law",
  "Psychology","Sociology","Anthropology","World History","General Subjects",
  "English","Arabic","Urdu","Punjabi","French","Pashto","Translation Services",
  "Tajweed","Tafseer","Hadith","Hifz","Fiqh","Qirat",
  "Career Coach","Business Coach","Self Help Coach","Life Coach",
  "Canvas Painting","Watercolor Painting","Arts & Crafts","Illustration",
  "WordPress","Website Development","Frontend Development","Backend Development",
  "Full Stack Development","Mobile App Development","Software Development",
  "UI/UX Design","SEO","Digital Marketing","Social Media Marketing",
  "Content Writing","Copywriting","Virtual Assistant","Data Entry",
  "Lead Generation","Graphic Design","Logo Design","Brand Identity Design",
  "Poster Design","Banner Design","Social Media Design","Packaging Design",
  "Presentation Design","Print Design","UI Design","UX Design",
  "Video Editing","Motion Graphics","Animation","YouTube Editing",
  "Short Form Content","Podcast Editing","Bookkeeping","Accounting",
  "Recruitment","Customer Support","Sales","Project Management"
];

const ALL_COUNTRIES = [
  "USA","UK","Canada","Australia","Norway","Finland",
  "UAE","Qatar","Saudi Arabia","Kuwait","Oman","Bahrain",
  "Pakistan","India","Bangladesh","Sri Lanka","Nepal"
];

export default function App() {
  const [tab, setTab] = useState<TabType>("demand");
  const [data, setData] = useState<any[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [loading, setLoading] = useState(false);

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

    if (!user) return;

    const { data } = await supabase
      .from("user_skills")
      .select("skill")
      .eq("user_id", user.id);

    setUserSkills(
      (data || []).map((x) => String(x.skill))
    );
  }

  async function fetchData() {
    setLoading(true);

    let table = "demand_leads";

    if (tab === "supply") table = "supply_leads";
    if (tab === "saas") table = "saas_leads";

    const { data } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
    setLoading(false);
  }

  const filteredData = data.filter((item) => {
    let skill = "";

    if (tab === "demand")
      skill = item.skill_needed || "";

    if (tab === "supply")
      skill = item.required_skill || "";

    if (tab === "saas")
      skill = item.niche || "";

    const userSkillMatch =
      userSkills.length === 0 ||
      userSkills.some((s) =>
        skill.toLowerCase().includes(s.toLowerCase())
      );

    const manualSkillMatch =
      selectedSkill === "all" ||
      skill.toLowerCase().includes(
        selectedSkill.toLowerCase()
      );

    const countryMatch =
      selectedCountry === "all" ||
      item.country === selectedCountry;

    return (
      userSkillMatch &&
      manualSkillMatch &&
      countryMatch
    );
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: 20,
      }}
    >
      <h1>🚀 Opportunity Hub</h1>

      <p>
        My Skills:
        {userSkills.length > 0
          ? " " + userSkills.join(", ")
          : " No skills selected"}
      </p>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 20,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setTab("demand")}>
          Demand
        </button>

        <button onClick={() => setTab("supply")}>
          Supply
        </button>

        <button onClick={() => setTab("saas")}>
          SaaS
        </button>
      </div>

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
        >
          <option value="all">
            All Skills
          </option>

          {ALL_SKILLS.map((skill) => (
            <option
              key={skill}
              value={skill}
            >
              {skill}
            </option>
          ))}
        </select>

        <select
          value={selectedCountry}
          onChange={(e) =>
            setSelectedCountry(e.target.value)
          }
        >
          <option value="all">
            All Countries
          </option>

          {ALL_COUNTRIES.map((country) => (
            <option
              key={country}
              value={country}
            >
              {country}
            </option>
          ))}
        </select>
      </div>

      <p>
        Opportunities Found:
        {filteredData.length}
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredData.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #333",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <h3>
              {item.title ||
                item.company_name ||
                item.client_name ||
                item.name}
            </h3>

            <p>{item.description}</p>

            <p>
              🌍 {item.country || "Global"}
            </p>

            {item.skill_needed && (
              <p>
                Skill Needed:
                {item.skill_needed}
              </p>
            )}

            {item.required_skill && (
              <p>
                Required Skill:
                {item.required_skill}
              </p>
            )}

            {item.niche && (
              <p>
                Niche:
                {item.niche}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
        }

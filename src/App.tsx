import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [opportunities, setOpportunities] = useState<any[]>([]);

  // ✅ 1. FETCH DATA FROM SUPABASE (NORMAL APP FLOW)
  const fetchOpportunities = async () => {
    const { data, error } = await supabase
      .from("opportunities") // ⚠️ your table name
      .select("*");

    if (error) {
      console.error("FETCH ERROR:", error);
    } else {
      setOpportunities(data || []);
    }
  };

  // ✅ 2. ONE-TIME REAL DATA INSERT (RUN ONLY ONCE)
  const insertRealDataOnce = async () => {
    const alreadyInserted = localStorage.getItem("realDataInserted");

    if (alreadyInserted) return; // 🚫 prevents loop

    try {
      const res = await fetch("https://remotive.com/api/remote-jobs");
      const json = await res.json();

      const jobs = json.jobs.slice(0, 10);

      for (const job of jobs) {
        await supabase.from("opportunities").insert({
          title: job.title,
          country: job.candidate_required_location || "Global",
          skill: job.category,
          type: "Demand Leads",
        });
      }

      localStorage.setItem("realDataInserted", "true");

      console.log("✅ REAL DATA INSERTED");
    } catch (err) {
      console.error("INSERT ERROR:", err);
    }
  };

  // ✅ 3. RUN ON LOAD
  useEffect(() => {
    insertRealDataOnce();   // 🔥 fills DB first time only
    fetchOpportunities();   // 🔥 loads data into UI
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Opportunities</h1>

      <p>Opportunities Found: {opportunities.length}</p>

      <ul>
        {opportunities.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong> — {item.country} — {item.skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

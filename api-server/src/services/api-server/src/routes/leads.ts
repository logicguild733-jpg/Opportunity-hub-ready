import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  "https://qnkxrxxwfikhrlirfleg.supabase.co",
  "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S"
);

// simple limits (safe fallback)
const PLAN_LIMITS = {
  basic: 15,
  premium: 30,
  gold: 100,
};

router.get("/", async (req, res) => {
  try {
    // ⚡ TEMP: no auth dependency (prevents crashes)
    const userPlan = "basic";
    const limit = PLAN_LIMITS[userPlan];

    // 🔥 last 10 days fresh leads
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const { data, error } = await supabase
      .from("demand_leads")
      .select("*")
      .gte("created_at", tenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Supabase error:", error);
      return res.json([]);
    }

    const formatted = (data || []).map((lead) => ({
      title: lead.client_name,
      description: lead.description,
      link: lead.link || "#",
      tags: lead.skill,
      isLocked: false,
    }));

    return res.json(formatted);
  } catch (err) {
    console.error("Leads endpoint error:", err);
    return res.json([]);
  }
});

export default router;

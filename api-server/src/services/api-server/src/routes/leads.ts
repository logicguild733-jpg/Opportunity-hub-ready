import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  "https://qnkxrxxwfikhrlirfleg.supabase.co",
  "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S"
);

// Plan limits (simple, no bug)
const PLAN_LIMITS = {
  basic: 15,
  premium: 30,
  gold: 100
};

router.get("/", async (req, res) => {
  try {
    const user = req.user || {};
    const userPlan = user.plan || "basic";

    const maxLeads = PLAN_LIMITS[userPlan] || 15;

    // 🔥 Get fresh leads (last 10 days)
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const { data, error } = await supabase
      .from("demand_leads")
      .select("*")
      .gte("created_at", tenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(maxLeads);

    if (error) {
      console.error("Supabase error:", error);
      return res.json([]);
    }

    // ✅ Return clean leads
    const formatted = (data || []).map((lead) => ({
      title: lead.client_name,
      description: lead.description,
      link: "#",
      tags: lead.skill,
      isLocked: false
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Leads endpoint error:", err.message);
    res.json([]);
  }
});

export default router;

import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  "https://qnkxrxxwfikhrlirfleg.supabase.co",
  "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S"
);

router.get("/", async (req, res) => {
  try {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const { data, error } = await supabase
      .from("demand_leads")
      .select("*")
      .gte("created_at", tenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Supabase error:", error);
      return res.json([]);
    }

    return res.json(
      (data || []).map((lead) => ({
        title: lead.client_name,
        description: lead.description,
        link: lead.link || "#",
        tags: lead.skill,
        isLocked: false,
      }))
    );
  } catch (err) {
    console.error("Leads endpoint error:", err);
    return res.json([]);
  }
});

export default router;

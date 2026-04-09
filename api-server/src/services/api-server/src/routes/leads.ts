import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  "https://qnkxrxxwfikhrlirfleg.supabase.co",
  "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S"
);

// FULL SKILL SYSTEM (your real business logic)
const SKILL_GROUPS = {
  teaching: [
    "quran_teacher",
    "arabic_teacher",
    "english_teacher",
    "urdu_teacher",
    "language_teacher",
    "teacher"
  ],

  coaching: [
    "business_coach",
    "career_coach",
    "self_help_coach"
  ],

  freelance: [
    "freelancer",
    "developer",
    "designer",
    "writer",
    "video_editor",
    "digital_marketing"
  ],

  business: [
    "restaurant_owner",
    "food_business",
    "startup",
    "agency"
  ]
};

router.get("/", async (req, res) => {
  try {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    // default = all skills (no user auth needed yet)
    const userSkills = Object.values(SKILL_GROUPS).flat().map(s => s.toLowerCase());

    const { data, error } = await supabase
      .from("demand_leads")
      .select("*")
      .gte("created_at", tenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Supabase error:", error);
      return res.json([]);
    }

    // SMART MATCHING ENGINE
    const filtered = (data || []).filter((lead) => {
      const text = `${lead.client_name} ${lead.description} ${lead.skill}`.toLowerCase();
      return userSkills.some(skill => text.includes(skill));
    });

    return res.json(
      filtered.slice(0, 20).map((lead) => ({
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

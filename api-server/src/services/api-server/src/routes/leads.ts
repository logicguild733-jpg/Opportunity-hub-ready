import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  "https://qnkxrxxwfikhrlirfleg.supabase.co",
  "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S"
);

// FULL SKILL SYSTEM (KEEP THIS)
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
    const userPlan = (req.query.plan as string) || "basic";

    const LIMITS = {
      basic: 10,
      premium: 30,
      gold: 100,
    };

    const limit = LIMITS[userPlan as keyof typeof LIMITS] || 5;

    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

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

    // SMART SKILL MATCHING (KEEP THIS)
    const allSkills = Object.values(SKILL_GROUPS)
      .flat()
      .map(s => s.toLowerCase());

    const filtered = (data || []).filter((lead) => {
      const text = `${lead.client_name} ${lead.description} ${lead.skill}`.toLowerCase();
      return allSkills.some(skill => text.includes(skill));
    });

    const final = filtered.slice(0, limit).map((lead) => ({
      title: lead.client_name,
      description: lead.description,
      link: lead.link || "#",
      tags: lead.skill,
      isLocked: false,
    }));

    return res.json({
      leads: final,
      remaining: Math.max(filtered.length - limit, 0),
      upgradeMessage: filtered.length > limit ? "Upgrade to unlock more leads" : null
    });

  } catch (err) {
    console.error(err);
    return res.json({ leads: [], remaining: 0 });
  }
});

export default router;

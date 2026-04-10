import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

// ✅ SUPABASE (YOUR KEYS ADDED)
const supabase = createClient(
  "https://qnkxrxxwfikhrlirfleg.supabase.co",
  "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S"
);

// ✅ PLAN LIMITS (FINAL)
const PLAN_LIMITS: Record<string, number> = {
  basic: 15,
  premium: 30,
  gold: 100,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // ✅ GET TOKEN
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    let userPlan = "basic";

    // ✅ DECODE USER (SAFE)
    if (token) {
      try {
        const decoded: any = jwt.decode(token);
        userPlan = decoded?.subscription_plan || "basic";
      } catch {
        userPlan = "basic";
      }
    }

    // ✅ LIMIT BASED ON PLAN
    const limit = PLAN_LIMITS[userPlan] || 15;

    // ✅ FETCH LEADS
    const { data, error } = await supabase
      .from("demand_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Supabase error:", error);
      return res.json([]);
    }

    return res.json({
      leads: data || [],
      plan: userPlan,
      limit,
    });

  } catch (err) {
    console.error("Leads API error:", err);
    return res.json([]);
  }
}

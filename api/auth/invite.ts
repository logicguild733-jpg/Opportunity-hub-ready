import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query;

  const { data, error } = await supabase
    .from("allowed_users")
    .select("*")
    .eq("invite_code", token)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Invalid invite link" });
  }

  return res.json({
    email: data.email,
    plan: data.plan,
    trial_days: 14,
  });
}

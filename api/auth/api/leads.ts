import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { data, error } = await supabase
    .from("demand_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) return res.json([]);

  return res.json(data);
}

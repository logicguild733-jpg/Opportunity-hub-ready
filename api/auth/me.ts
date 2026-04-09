import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = req.headers.authorization;

  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", decoded.id)
      .single();

    return res.json({
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role || "user"
    });
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

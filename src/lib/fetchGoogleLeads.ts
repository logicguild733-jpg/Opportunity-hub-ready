import Parser from "rss-parser";
import { supabase } from "./supabase";

const parser = new Parser();

const queries = [
  "online Quran teacher job",
  "remote tutor needed",
  "home tuition required",
  "online teacher required",
  "virtual assistant remote job",
];

const isValidLead = (title: string) => {
  const keywords = ["teacher", "job", "required", "needed", "tutor"];
  return keywords.some((k) =>
    title.toLowerCase().includes(k)
  );
};

export async function fetchGoogleLeads() {
  if (!supabase) {
    console.error("Supabase not initialized");
    return;
  }

  for (const query of queries) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}&tbm=nws&output=rss`;

    try {
      const feed = await parser.parseURL(url);

      for (const item of feed.items) {
        if (!item.title || !item.link) continue;

        // ✅ filter
        if (!isValidLead(item.title)) continue;

        // ✅ check duplicate
        const { data: existing } = await supabase
          .from("leads")
          .select("id")
          .eq("link", item.link)
          .maybeSingle();

        if (existing) continue;

        // ✅ insert
        const { error } = await supabase.from("leads").insert([
          {
            title: item.title,
            link: item.link,
            source: "google",
            created_at: new Date(),
          },
        ]);

        if (error) {
          console.error("Insert error:", error.message);
        }
      }
    } catch (err) {
      console.error("Fetch error:", query, err);
    }
  }
}

import Parser from "rss-parser";
import { supabase } from "../lib/supabase";

const parser = new Parser();

const RSS_FEEDS = [
"https://remoteok.com/remote-jobs.rss",
"https://weworkremotely.com/categories/remote-customer-support-jobs.rss",
"https://weworkremotely.com/categories/remote-programming-jobs.rss"
];

export async function fetchRSSLeads() {
try {
let inserted = 0;

for (const feedUrl of RSS_FEEDS) {
  try {
    const feed = await parser.parseURL(feedUrl);

    for (const item of feed.items || []) {
      const title = item.title || "Untitled Opportunity";

      const description =
        item.contentSnippet ||
        item.content ||
        item.summary ||
        "";

      const { data: existing } = await supabase
        .from("demand_leads")
        .select("id")
        .eq("title", title)
        .limit(1);

      if (existing && existing.length > 0) {
        continue;
      }

      const { error } = await supabase
        .from("demand_leads")
        .insert({
          type: "Demand",
          source: feedUrl,
          client_name: title,
          skill_needed: "General",
          description: description,
          contact_email: null,
          contact_phone: null,
          title: title,
          category: "Remote Jobs",
          subcategory: "RSS",
          country_city: "Global",
          budget: null,
          currency: null,
          contact_name: null,
          created_at: new Date().toISOString()
        });

      if (!error) {
        inserted++;
      } else {
        console.error(error);
      }
    }
  } catch (feedError) {
    console.error("Feed failed:", feedUrl, feedError);
  }
}

console.log(`Inserted ${inserted} RSS leads`);
return inserted;

} catch (err) {
console.error("RSS import failed:", err);
return 0;
}
}

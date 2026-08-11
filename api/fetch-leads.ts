import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const serperApiKey =
  process.env.SERPER_API_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Missing Supabase server environment variables"
  );
}

const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey
);

type Lead = {
  type: string;
  source: string;
  client_name: string;
  skill_needed: string;
  description: string;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string;
  status: string;
  title: string;
  category: string;
  subcategory: string;
  country: string | null;
  city: string | null;
  budget: number | null;
  currency: string | null;
  contact_name: string | null;
};

const RSS_FEEDS = [
  "https://remoteok.com/remote-jobs.rss",
  "https://weworkremotely.com/categories/remote-customer-support-jobs.rss",
  "https://weworkremotely.com/categories/remote-programming-jobs.rss",
];

const SEARCH_QUERIES = [
  '"looking for online English teacher"',
  '"need online English teacher"',
  '"looking for Arabic teacher"',
  '"need online tutor"',
  '"looking for graphic designer"',
  '"need web developer"',
  '"hiring remote customer support"',
  '"looking for content writer"',
];

const ALLOWED_COUNTRIES = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Norway",
  "Finland",
  "UAE",
  "Qatar",
  "Saudi Arabia",
  "Kuwait",
  "Oman",
  "Bahrain",
  "Pakistan",
  "India",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
];

const seventyTwoHoursAgo = () =>
  new Date(
    Date.now() - 72 * 60 * 60 * 1000
  );

function detectCountry(text: string): string | null {
  const lower = text.toLowerCase();

  for (const country of ALLOWED_COUNTRIES) {
    if (lower.includes(country.toLowerCase())) {
      return country;
    }
  }

  return null;
}

function detectSkill(text: string): string {
  const lower = text.toLowerCase();

  const skills = [
    "English",
    "Arabic",
    "Math",
    "Science",
    "Chemistry",
    "Biology",
    "Economics",
    "Law",
    "Psychology",
    "Sociology",
    "WordPress",
    "Website Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile App Development",
    "UI/UX Design",
    "SEO",
    "Digital Marketing",
    "Content Writing",
    "Copywriting",
    "Virtual Assistant",
    "Data Entry",
    "Lead Generation",
    "Graphic Design",
    "Video Editing",
    "Bookkeeping",
    "Accounting",
    "Recruitment",
    "Customer Support",
    "Sales",
  ];

  const match = skills.find((skill) =>
    lower.includes(skill.toLowerCase())
  );

  return match || "General";
}

function cleanText(value: unknown): string {
  if (!value) return "";

  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createLead(
  title: string,
  description: string,
  source: string,
  createdAt: Date,
  link?: string
): Lead {
  const combinedText =
    `${title} ${description}`;

  const country =
    detectCountry(combinedText);

  const skill =
    detectSkill(combinedText);

  return {
    type: "Demand",

    source:
      link
        ? `${source} | ${link}`
        : source,

    client_name:
      title,

    skill_needed:
      skill,

    description:
      description,

    contact_email:
      null,

    contact_phone:
      null,

    created_at:
      createdAt.toISOString(),

    status:
      "new",

    title:
      title,

    category:
      "Remote Opportunities",

    subcategory:
      source,

    country:
      country,

    city:
      null,

    budget:
      null,

    currency:
      null,

    contact_name:
      null,
  };
}

export default async function handler(
  req: Request
) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed",
      }),
      {
        status: 405,
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  }

  try {
    const leads: Lead[] = [];

    const cutoff =
      seventyTwoHoursAgo();

    // ==================================================
    // 1. GOOGLE SERPER
    // ==================================================

    if (serperApiKey) {
      for (const query of SEARCH_QUERIES) {
        try {
          const response =
            await fetch(
              "https://google.serper.dev/search",
              {
                method: "POST",

                headers: {
                  "X-API-KEY":
                    serperApiKey,

                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  q: query,
                  tbs: "qdr:d",
                  num: 10,
                }),
              }
            );

          if (!response.ok) {
            console.error(
              "Serper error:",
              response.status
            );

            continue;
          }

          const result =
            await response.json();

          for (
            const item of
            result.organic || []
          ) {
            if (
              !item.title ||
              !item.link
            ) {
              continue;
            }

            const title =
              cleanText(
                item.title
              );

            const description =
              cleanText(
                item.snippet
              );

            const lead =
              createLead(
                title,
                description,
                "Google",
                new Date(),
                item.link
              );

            leads.push(lead);
          }
        } catch (error) {
          console.error(
            "Serper query failed:",
            error
          );
        }
      }
    }

    // ==================================================
    // 2. RSS
    // ==================================================

    for (
      const feedUrl of RSS_FEEDS
    ) {
      try {
        const response =
          await fetch(feedUrl);

        if (!response.ok) {
          console.error(
            "RSS failed:",
            feedUrl,
            response.status
          );

          continue;
        }

        const xml =
          await response.text();

        const items =
          xml.match(
            /<item[\s\S]*?<\/item>/gi
          ) || [];

        for (
          const item of items
        ) {
          const titleMatch =
            item.match(
              /<title[^>]*>([\s\S]*?)<\/title>/i
            );

          const linkMatch =
            item.match(
              /<link[^>]*>([\s\S]*?)<\/link>/i
            );

          const descriptionMatch =
            item.match(
              /<description[^>]*>([\s\S]*?)<\/description>/i
            );

          const dateMatch =
            item.match(
              /<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i
            );

          const title =
            cleanText(
              titleMatch?.[1]
            );

          const link =
            cleanText(
              linkMatch?.[1]
            );

          const description =
            cleanText(
              descriptionMatch?.[1]
            );

          const published =
            dateMatch?.[1]
              ? new Date(
                  cleanText(
                    dateMatch[1]
                  )
                )
              : new Date();

          if (
            !title ||
            !published ||
            isNaN(
              published.getTime()
            )
          ) {
            continue;
          }

          if (
            published < cutoff
          ) {
            continue;
          }

          leads.push(
            createLead(
              title,
              description,
              "RSS",
              published,
              link
            )
          );
        }
      } catch (error) {
        console.error(
          "RSS feed failed:",
          feedUrl,
          error
        );
      }
    }

    // ==================================================
    // 3. REMOVE DUPLICATES
    // ==================================================

    const uniqueLeads =
      Array.from(
        new Map(
          leads.map((lead) => [
            `${lead.title
              .toLowerCase()
              .trim()}|${lead.source}`,
            lead,
          ])
        ).values()
      );

    // ==================================================
    // 4. INSERT INTO SUPABASE
    // ==================================================

    let inserted = 0;

    for (
      const lead of uniqueLeads
    ) {
      const { data: existing } =
        await supabase
          .from("demand_leads")
          .select("id")
          .eq(
            "title",
            lead.title
          )
          .eq(
            "source",
            lead.source
          )
          .limit(1);

      if (
        existing &&
        existing.length > 0
      ) {
        continue;
      }

      const { error } =
        await supabase
          .from("demand_leads")
          .insert(
            lead
          );

      if (error) {
        console.error(
          "Supabase insert error:",
          error
        );

        continue;
      }

      inserted++;
    }

    return new Response(
      JSON.stringify({
        success: true,

        collected:
          leads.length,

        unique:
          uniqueLeads.length,

        inserted,

        freshness:
          "72_hours",
      }),
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error(
      "Fetch leads error:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error?.message ||
          "Lead collection failed",
      }),
      {
        status: 500,

        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  }
}

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const config = {
  runtime: 'edge', 
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { query, rssUrl, subreddit } = await req.json();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const leadsToInsert: any[] = [];

    // --- PHASE 1: GOOGLE SERPER API ---
    if (query && process.env.SERPER_API_KEY) {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': process.env.SERPER_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: query, tbs: 'qdr:d' }), // Only results from last 24h
      });
      const data = await response.json();
      if (data.organic) {
        data.organic.forEach((item: any) => {
          leadsToInsert.push({
            title: item.title,
            link: item.link,
            description: item.snippet,
            source: 'Google (Serper)',
            created_at: new Date().toISOString(),
          });
        });
      }
    }

    // --- PHASE 2: STANDARD RSS FEEDS ---
    if (rssUrl) {
      const rssResponse = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
      const rssData = await rssResponse.json();
      if (rssData.items) {
        rssData.items.forEach((item: any) => {
          const pubDate = new Date(item.pubDate);
          if (pubDate >= twentyFourHoursAgo) {
            leadsToInsert.push({
              title: item.title,
              link: item.link || item.guid,
              description: item.description || item.content,
              source: `RSS: ${rssData.feed.title || 'Feed'}`,
              created_at: pubDate.toISOString(),
            });
          }
        });
      }
    }

    // --- PHASE 3: REDDIT NATIVE PARSING (No API Key Required!) ---
    if (subreddit) {
      // Fetching subreddit new listings using native clean JSON endpoints
      const redditResponse = await fetch(`https://www.reddit.com/r/${subreddit}/new.json?limit=10`, {
        headers: { 'User-Agent': 'OpportunityHubBot/1.0' } // Reddit requires a custom user-agent string
      });
      const redditData = await redditResponse.json();
      
      if (redditData?.data?.children) {
        redditData.data.children.forEach((post: any) => {
          const postData = post.data;
          // Reddit provides timestamps in seconds, convert to milliseconds
          const createdDate = new Date(postData.created_utc * 1000); 

          if (createdDate >= twentyFourHoursAgo) {
            leadsToInsert.push({
              title: postData.title,
              link: `https://old.reddit.com${postData.permalink}`,
              description: postData.selftext || 'Link post layout',
              source: `Reddit: r/${subreddit}`,
              created_at: createdDate.toISOString(),
            });
          }
        });
      }
    }

    // --- PHASE 4: DATABASE UPSERT ---
    if (leadsToInsert.length > 0) {
      const { error } = await supabase
        .from('leads')
        .upsert(leadsToInsert, { onConflict: 'link' }); // Keeps database perfectly clean of duplicates

      if (error) throw error;
    }

    return new Response(
      JSON.stringify({ success: true, count: leadsToInsert.length }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

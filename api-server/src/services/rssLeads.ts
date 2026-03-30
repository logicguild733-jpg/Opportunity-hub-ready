import fetch from 'node-fetch';

export async function fetchRSSLeads() {
  try {
    // Example RSS feed - replace with your real feeds
    const rssUrl = 'https://example.com/rss.xml';
    const response = await fetch(rssUrl);
    const text = await response.text();

    // Simple parse: return dummy for now (implement proper XML parsing if needed)
    return [
      {
        title: 'Sample Lead 1',
        description: 'This is a sample RSS lead',
        link: 'https://example.com/lead1',
        tags: 'teacher,freelancer'
      },
      {
        title: 'Sample Lead 2',
        description: 'This is another RSS lead',
        link: 'https://example.com/lead2',
        tags: 'business_coach'
      }
    ];
  } catch (err) {
    console.error('RSS fetch error:', err);
    return [];
  }
}

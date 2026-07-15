interface OpenGraphData {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

function extractMetaContent(
  html: string,
  property: string,
): string | undefined {
  // Match meta tags with property/name
  const propertyMatch = new RegExp(
    `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  const contentMatch = new RegExp(
    `<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["'][^>]*>`,
    "i",
  );

  const match1 = html.match(propertyMatch);
  const match2 = html.match(contentMatch);

  // Use optional chaining (?.) and nullish coalescing (??) to handle null values
  return match1?.[1] ?? match2?.[1] ?? undefined;
}

function extractTitle(html: string): string | undefined {
  const match = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
  return match ? match[1] : undefined;
}

// External fetching is disabled in this build — scrapeOpenGraph makes no
// network request and returns empty metadata. The HTML-parsing helpers below
// are retained for when a real fetch is wired back in.
export async function scrapeOpenGraph(_url: string): Promise<OpenGraphData> {
  void extractMetaContent;
  void extractTitle;
  return {};
}

import { writeFile } from "node:fs/promises";

const SOURCES = [
  {
    name: "BBC News 코리아",
    url: "https://feeds.bbci.co.uk/korean/rss.xml"
  },
  {
    name: "Google 뉴스",
    url: "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko"
  },
  {
    name: "The Guardian Life",
    url: "https://www.theguardian.com/lifeandstyle/rss"
  }
];

const MAX_ITEMS = 12;

function decodeEntities(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .trim();
}

function stripTags(value = "") {
  return decodeEntities(value.replace(/<[^>]*>/g, " "));
}

function readTag(item, tagName) {
  const match = item.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? stripTags(match[1]) : "";
}

function readLink(item) {
  const atomLink = item.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  if (atomLink) {
    return decodeEntities(atomLink[1]);
  }

  return readTag(item, "link");
}

function parseDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date(0) : date;
}

function parseFeed(xml, sourceName) {
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/gi) || [];

  return itemMatches
    .map((item) => {
      const title = readTag(item, "title");
      const url = readLink(item);
      const published = readTag(item, "pubDate") || readTag(item, "published") || readTag(item, "updated");

      if (!title || !url) {
        return null;
      }

      return {
        title,
        url,
        source: sourceName,
        publishedAt: parseDate(published).toISOString()
      };
    })
    .filter(Boolean);
}

async function fetchSource(source) {
  const response = await fetch(source.url, {
    headers: {
      "user-agent": "today-heart-delivery-news-updater/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`${source.name} returned ${response.status}`);
  }

  const xml = await response.text();
  return parseFeed(xml, source.name);
}

function dedupe(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.url || item.title;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

const results = await Promise.allSettled(SOURCES.map(fetchSource));
const items = dedupe(
  results
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .sort((a, b) => parseDate(b.publishedAt) - parseDate(a.publishedAt))
).slice(0, MAX_ITEMS);

if (!items.length) {
  throw new Error("No news items were fetched.");
}

await writeFile(
  "news.json",
  `${JSON.stringify(
    {
      updatedAt: new Date().toISOString(),
      items
    },
    null,
    2
  )}\n`
);

console.log(`Wrote ${items.length} news items.`);

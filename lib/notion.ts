import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Job } from "@/types/job";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID =
  process.env.NOTION_DATABASE_ID ?? "912662c4ff1f4200a1ec12f59acaaff2";

function getText(prop: PageObjectResponse["properties"][string]): string {
  if (prop.type === "title") return prop.title.map((t) => t.plain_text).join("");
  if (prop.type === "rich_text") return prop.rich_text.map((t) => t.plain_text).join("");
  return "";
}

function getSelect(prop: PageObjectResponse["properties"][string]): string | null {
  if (prop.type === "select") return prop.select?.name ?? null;
  return null;
}

function getDate(prop: PageObjectResponse["properties"][string]): string | null {
  if (prop.type === "date") return prop.date?.start ?? null;
  return null;
}

function getCheckbox(prop: PageObjectResponse["properties"][string]): boolean {
  if (prop.type === "checkbox") return prop.checkbox;
  return false;
}

function getUrl(prop: PageObjectResponse["properties"][string]): string | null {
  if (prop.type === "url") return prop.url;
  return null;
}

export async function getJobs(): Promise<Job[]> {
  if (!process.env.NOTION_API_KEY) return [];

  const jobs: Job[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [{ property: "Date Found", direction: "descending" }],
      start_cursor: cursor,
      page_size: 100,
    });

    for (const page of response.results) {
      if (page.object !== "page") continue;
      const p = page as PageObjectResponse;
      const props = p.properties;

      jobs.push({
        id: p.id,
        notionUrl: p.url,
        jobTitle: getText(props["Job Title"]),
        company: getText(props["Company"]),
        industry: (getSelect(props["Industry"]) as Job["industry"]) ?? null,
        location: getText(props["Location"]),
        datePosted: getDate(props["Date Posted"]),
        dateFound: getDate(props["Date Found"]),
        highInterest: getCheckbox(props["High Interest"]),
        clearance: (getSelect(props["Clearance"]) as Job["clearance"]) ?? null,
        status: (getSelect(props["Status"]) as Job["status"]) ?? null,
        jobUrl: getUrl(props["URL"]),
      });
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return jobs;
}

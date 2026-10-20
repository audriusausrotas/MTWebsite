import type { SiteData } from "#shared/types/website";

// ?part=fences|gallery|funded – puslapis gauna tik jam reikalingą dalį (mažesnis HTML)
export default defineEventHandler(async (event): Promise<Partial<SiteData>> => {
  const { complete, ...data } = await getSiteData();
  const part = getQuery(event).part;
  if (part === "fences" || part === "gallery" || part === "funded") return { [part]: data[part] };
  return data;
});

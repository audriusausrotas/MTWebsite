import type { SiteData } from "#shared/types/website";

// ?part=fences|gallery|funded|gates|gateSlots – puslapis gauna tik jam reikalingą dalį (mažesnis HTML)
export default defineEventHandler(async (event): Promise<Partial<SiteData>> => {
  const { complete, ...data } = await getSiteData();
  const part = String(getQuery(event).part ?? "") as keyof SiteData;
  if (Object.hasOwn(data, part)) return { [part]: data[part] };
  return data;
});

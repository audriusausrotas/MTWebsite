import type { SiteData } from "#shared/types/website";

type Part = keyof SiteData;

// useFences / useGallery / useFunded būsenų raktai
const STATE_KEY: Record<Part, string> = { fences: "fences", gallery: "images", funded: "funded" };

// Puslapis, kuriam reikia MTSoft duomenų, įsikelia tik savo dalį (kitų puslapių HTML jų neneša).
// Vieną kartą: serveryje – per užklausą, naršyklėje – kai pirmą kartą atidaromas toks puslapis.
export const loadSiteData = (part: Part) => {
  // būsena paimama prieš await – po jo Nuxt kontekstas nebepasiekiamas
  const state = useState(STATE_KEY[part]);
  return callOnce(`site-data-${part}`, async () => {
    try {
      const data = await $fetch<Partial<SiteData>>("/api/site-data", { query: { part } });
      state.value = data[part] ?? [];
    } catch (error) {
      console.error(`Nepavyko gauti svetainės duomenų (${part}):`, error);
    }
  });
};

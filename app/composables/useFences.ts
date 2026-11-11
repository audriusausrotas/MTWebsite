import type { WebsiteFence } from "#shared/types/website";

// Tvorų kategorijų puslapiai: raktas = puslapio kelias (/tvoros/<key>) ir i18n raktas,
// category – MTSoft tvoros kategorija, image – kategorijos kortelės nuotrauka
export const FENCE_CATEGORIES = [
  { key: "skardines-tvoros", category: "Tvora", image: "/images/tvoros/daimond6090.jpg" },
  { key: "metalines-tvoros", category: "Metalinė", image: "/images/tvoros/metalines-tvoros.jpg" },
  { key: "tvoralentes", category: "Tvoralentė", image: "/images/tvoros/dilė.jpg" },
  { key: "segmentines-tvoros", category: "Segmentas", image: "/images/tvoros/tvora22.jpg" },
] as const;

export type FenceCategoryKey = (typeof FENCE_CATEGORIES)[number]["key"];

// Viena puslapio kortelė: tvora arba kelios vienodos tvoros (skiriasi tik dydžiu ar pan.)
export interface FenceGroup {
  fence: WebsiteFence;
  name: string;
  // grupės narių pavadinimai be bendros pradžios (pvz. „2.5x1.03 m, 4mm“); viena tvora – tuščia
  variants: string[];
  // kortelės id nuorodoms puslapio viduje
  anchor: string;
}

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Bendra pavadinimų pradžia žodžiais: „Segmentas 2.5x1.03 m“ + „Segmentas 2.5x1.23 m“ -> „Segmentas“
const commonPrefix = (names: string[]) => {
  const words = names.map((name) => name.trim().split(/\s+/));
  const first = words[0] ?? [];
  let count = 0;
  while (count < first.length && words.every((w) => w[count] === first[count])) count++;
  return first.slice(0, count).join(" ");
};

// Tvoros su tuo pačiu aprašymu ir tomis pačiomis nuotraukomis rodomos viena kortele
// (kitaip puslapyje kartotųsi vienodi blokai), jų pavadinimai tampa variantų sąrašu
export const groupFences = (list: WebsiteFence[]): FenceGroup[] => {
  const buckets = new Map<string, WebsiteFence[]>();
  for (const fence of list) {
    const key = fence.description.trim()
      ? `${fence.description.trim()}|${fence.images.map((image) => image.url).join(",")}`
      : fence._id;
    buckets.set(key, [...(buckets.get(key) ?? []), fence]);
  }

  return [...buckets.values()].map((members) => {
    const fence = members[0]!;
    if (members.length === 1) {
      return { fence, name: fence.name, variants: [], anchor: slugify(fence.name) || fence._id };
    }
    const names = members.map((member) => member.name.trim());
    const prefix = commonPrefix(names);
    const name = prefix || fence.name;
    const variants = names
      .map((item) => (prefix ? item.slice(prefix.length).trim() : item))
      .filter(Boolean);
    return { fence, name, variants, anchor: slugify(name) || fence._id };
  });
};

export const useFences = () => {
  const fences = useState("fences", () => [] as WebsiteFence[]);

  // kategorijos puslapio kortelės
  const groupsOf = (key: FenceCategoryKey) => {
    const category = FENCE_CATEGORIES.find((item) => item.key === key)?.category;
    return groupFences(fences.value.filter((fence) => fence.category === category));
  };

  return {
    fences,
    groupsOf,
  };
};

import { b as useState } from './server.mjs';
import { computed } from 'vue';

const useFences = () => {
  const fences = useState("fences", () => []);
  const segmentFences = computed(() => fences.value.filter((f) => f.category === "Segmentas"));
  const metalFences = computed(() => fences.value.filter((f) => f.category === "Metalinė"));
  const fenceboards = computed(() => fences.value.filter((f) => f.category === "Tvoralentė"));
  const metalSheetfences = computed(() => fences.value.filter((f) => f.category === "Tvora"));
  return {
    fences,
    segmentFences,
    metalFences,
    fenceboards,
    metalSheetfences
  };
};

export { useFences as u };
//# sourceMappingURL=useFences-B8wmbRIS.mjs.map

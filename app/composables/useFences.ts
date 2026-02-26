export const useFences = () => {
  const fences = useState("fences", () => [] as any[]);

  const segmentFences = computed(() => fences.value.filter((f) => f.category === "Segmentas"));

  const metalFences = computed(() => fences.value.filter((f) => f.category === "Metalinė"));

  const fenceboards = computed(() => fences.value.filter((f) => f.category === "Tvoralentė"));

  const metalSheetfences = computed(() => fences.value.filter((f) => f.category === "Tvora"));

  return {
    fences,
    segmentFences,
    metalFences,
    fenceboards,
    metalSheetfences,
  };
};

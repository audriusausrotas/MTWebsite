export const useData = () => {
  const fences = useState("fences", () => [] as any[]);

  const segmentFences = computed(() =>
    fences.value.filter((f) => f.category === "Segmentas" && f.aditional?.show),
  );

  const metalFences = computed(() =>
    fences.value.filter((f) => f.category === "Metalinė" && f.aditional?.show),
  );

  const fenceboards = computed(() =>
    fences.value.filter((f) => f.category === "Tvoralentė" && f.aditional?.show),
  );

  const metalSheetfences = computed(() =>
    fences.value.filter((f) => f.category === "Tvora" && f.aditional?.show),
  );

  return {
    fences,
    segmentFences,
    metalFences,
    fenceboards,
    metalSheetfences,
  };
};

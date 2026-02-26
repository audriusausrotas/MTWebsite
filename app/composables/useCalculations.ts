import type { Client } from "~/data/interfaces";

export const useCalculations = () => {
  const { fences } = useFences();
  const client = reactive<Client>({ name: "", address: "", phone: "", email: "" });

  const selectedFence = useState<string>("selectedFence", () => "");
  const selectedColor = useState<string>("selectedColor", () => "");
  const selectedSeeThrough = useState<string>("selectedSeeThrough", () => "");
  const selectedTwoSided = useState<boolean>("selectedTwoSided", () => false);
  const selectedSpace = useState<number>("selectedSpace", () => 2);

  const selectedFenceType = computed(
    () => fences.value.find((f) => f.name.includes(selectedFence.value))?.category || null,
  );

  watch(selectedTwoSided, (val) => {
    selectedSpace.value = val ? 6 : 2;
  });

  return {
    client,
    selectedFence,
    selectedColor,
    selectedSeeThrough,
    selectedTwoSided,
    selectedSpace,
    selectedFenceType,
  };
};

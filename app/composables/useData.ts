export const useData = () => {
  const fences = useState("fences", () => [] as any[]);
  //   const products = useState("products", () => [] as any[]);
  //   const settings = useState("settings", () => ({}));

  return { fences };
};

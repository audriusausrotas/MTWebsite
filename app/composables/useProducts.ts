import type { Product } from "~/data/interfaces";

export const useProducts = () => {
  const products = useState("products", () => [] as Product[]);

  const productsToDisplay = computed(() =>
    products.value.filter((product) => product.aditional?.show),
  );
  return {
    products,
    productsToDisplay,
  };
};

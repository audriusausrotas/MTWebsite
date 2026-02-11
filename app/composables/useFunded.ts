import type { Image } from "~/data/interfaces";

export const useFunded = () => {
  const funded = useState("funded", () => [] as Image[]);

  return {
    funded,
  };
};

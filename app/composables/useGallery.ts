import type { Image } from "~/data/interfaces";

export const useGallery = () => {
  const images = useState("images", () => [] as Image[]);

  return {
    images,
  };
};

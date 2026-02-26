export default async () => {
  const { fences } = useFences();
  const { images } = useGallery();
  const { funded } = useFunded();
  const { products } = useProducts();

  const [fencesResponse, imagesResponse, fundedResponse, productsResponse] = await Promise.all([
    request.get("getFences"),
    request.get("getGallery"),
    request.get("getFunded"),
    request.get("getProducts"),
  ]);
  fences.value = fencesResponse.success ? fencesResponse.data : [];
  images.value = imagesResponse.success ? imagesResponse.data : [];
  funded.value = fundedResponse.success ? fundedResponse.data : [];
  products.value = productsResponse.success ? productsResponse.data : [];
};

<script setup lang="ts">
const { fences } = useData();
const { images } = useGallery();
const { funded } = useFunded();

if (!fences.value.length) {
  try {
    const response: any = await request.get("getFences");
    response.success && (fences.value = response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
  }
}

if (!images.value.length) {
  try {
    const response: any = await request.get("getGallery");
    response.success && (images.value = response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
  }
}

if (!funded.value.length) {
  try {
    const response: any = await request.get("getFunded");
    response.success && (funded.value = response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
  }
}
</script>

<template>
  <div class="w-full h-svh flex flex-col justify-between">
    <NavigationHeader />
    <main>
      <slot />
    </main>
    <NavigationFooter />
  </div>
</template>
<style scoped></style>

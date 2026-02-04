<script setup lang="ts">
const { fences } = useData();

if (!fences.value.length) {
  try {
    const response: any = await request.get("getFences");
    response.success && (fences.value = response.data);
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

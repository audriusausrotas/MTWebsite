<script setup lang="ts">
const { fences } = useData();

const input = ref<string>("");

const searchResults = computed(() => {
  if (!input.value) return [];
  return fences.value.filter((fence) =>
    fence.name.toLowerCase().includes(input.value.toLowerCase()),
  );
});
</script>

<template>
  <div class="flex flex-col w-full px-4 gap-4 text-black font-medium relative">
    <input
      v-model="input"
      type="text"
      placeholder="Paieška"
      class="w-full p-2 border border-gray-200 bg-gray-200 rounded active:outline-none focus:outline-none"
    />

    <div
      class="flex flex-col gap-2 max-w-[calc(100%-32px)] w-full h-[calc(100dvh-32px)] bg-gray-200 rounded p-4 min-h-14 overflow-y-scroll absolute top-14 left-4"
    >
      <div v-for="result in searchResults" :key="result.id">{{ result.name }}</div>
    </div>
  </div>
</template>

<style scoped></style>

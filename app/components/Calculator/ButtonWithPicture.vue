<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: false,
    default: "",
  },

  name: {
    type: String,
    required: true,
  },

  selected: {
    type: String,
    required: false,
    default: "",
  },
  image: {
    type: Boolean,
    required: false,
    default: true,
  },
  color: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["onSelect"]);

const selectHandler = () => {
  emit("onSelect", props.name);
};
</script>

<template>
  <div
    @click="selectHandler"
    class="flex flex-col border-2 rounded-lg text-center hover:cursor-pointer p-2"
    :class="[props.selected === name ? 'border-red-600' : 'border-transparent']"
  >
    <NuxtImg
      v-if="image"
      :src="props.src"
      class="object-center object-cover rounded-md w-40 h-32"
    />
    <div v-else class="w-40 h-32 rounded-md" :class="color"></div>
    <div>{{ props.name }}</div>
  </div>
</template>

<style scoped></style>

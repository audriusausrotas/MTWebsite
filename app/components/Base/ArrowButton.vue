<script setup lang="ts">
type Variant = "primary" | "secondary" | "third";

interface Props {
  name?: string;
  variant?: Variant;
  to?: string;
  customText?: string;
}
const props = withDefaults(defineProps<Props>(), {
  name: "",
  variant: "primary",
  to: "#",
  customText: "",
});

const variants = {
  primary: {
    box: `
      border-red-main
      text-red-main
      bg--white
      group-hover:bg-red-main
      group-hover:text-white
    `,
    text: "text-black",
  },

  secondary: {
    box: `
      border-white
      text-white
      bg-red-main
      group-hover:bg-white
      group-hover:text-red-main
      group-hover:border-red-main
    `,
    text: "text-white",
  },
  third: {
    box: `
      border-white
      text-white
      bg-transparent
      group-hover:bg-red-main
      group-hover:border-red-main
    `,
    text: `
    text-white
    text-[24px]
    `,
  },
};
</script>

<template>
  <NuxtLink :to="to" class="group flex items-center gap-4 hover:cursor-pointer">
    <div
      class="w-14 h-14 flex items-center justify-center border-2 transition-colors duration-100"
      :class="variants[variant].box"
    >
      <svg class="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path d="M12 6 l8 6 -8 6 M4 12 h14" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <p class="text-sm font-semibold" :class="[variants[variant].text, customText]">
      {{ name }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string;
    label?: string;
    type?: string;
    name?: string | number;
    width?: string;
    active?: boolean;
    variant?: string;
    disable?: boolean;
  }>(),
  {
    placeholder: "",
    label: "",
    type: "text",
    name: "",
    width: "w-60",
    active: false,
    variant: "",
    disable: false,
  },
);

const emit = defineEmits(["onChange", "EnterPressed"]);

const emitUpdate = (value: string): void => {
  emit("onChange", value);
};

const inputRef = ref<HTMLInputElement | null>(null);

const handleEnterKey = (): void => {
  emit("EnterPressed");
};

onMounted(() => {
  if (props.active && inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <div class="flex flex-col" :class="[width, label ? 'h-16' : 'h-10']">
    <label v-if="label" :for="label" class="pl-2 pb-1 capitalize text-sm bg-inherit">{{
      label
    }}</label>

    <div
      class="flex items-center justify-center h-10 gap-3 px-4 border rounded-lg shadow-md border-stone-300"
      :class="disable ? 'bg-gray-300' : variant === 'dark' ? 'bg-gray-300' : 'bg-white'"
    >
      <slot />
      <input
        v-if="!disable"
        :value="name"
        :placeholder="placeholder"
        :id="label"
        :type="type"
        :disabled="disable"
        @input="emitUpdate(($event.target as HTMLInputElement)?.value)"
        @keyup.enter="handleEnterKey"
        ref="inputRef"
        class="w-full h-full bg-inherit active:outline-none focus:outline-none"
      />
      <p v-else-if="disable && name">{{ name }}</p>
    </div>
  </div>
</template>
<style scoped></style>

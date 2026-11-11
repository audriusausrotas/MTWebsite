<script setup lang="ts">
// Spalvų pasirinkimas (RAL). Pavyzdžiai – public/images/colors; kitoms spalvoms – apytikslė RAL spalva
defineProps<{ colors: string[] }>();
const selected = defineModel<string>({ required: true });

const { t } = useI18n();

const COLOR_IMAGES = ["3009", "6020", "7016", "7024", "8004", "8017", "8019", "9005"];
const COLOR_HEX: Record<string, string> = { "6005": "#114232", Zn: "#c4c8cc" };

const label = (color: string) => (color === "Zn" ? t("calc.color.zinc") : `RAL ${color}`);
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="color in colors"
      :key="color"
      type="button"
      :aria-pressed="selected === color"
      class="flex flex-col items-center gap-1 p-1 border-2 rounded-lg transition-colors hover:cursor-pointer"
      :class="selected === color ? 'border-red-main' : 'border-transparent hover:border-gray-300'"
      @click="selected = color"
    >
      <!-- pavyzdžio kampe – gamintojo užrašas, todėl rodoma priartinta apatinė dalis -->
      <span v-if="COLOR_IMAGES.includes(color)" class="block w-24 h-16 overflow-hidden rounded-md">
        <NuxtImg
          :src="`/images/colors/${color}.png`"
          alt=""
          width="192"
          height="128"
          class="w-full h-full object-cover scale-[2] origin-bottom-right"
        />
      </span>
      <span
        v-else
        class="w-24 h-16 rounded-md border border-gray-200"
        :style="{ backgroundColor: COLOR_HEX[color] ?? '#9ca3af' }"
      ></span>
      <span class="text-sm font-semibold">{{ label(color) }}</span>
    </button>
  </div>
</template>

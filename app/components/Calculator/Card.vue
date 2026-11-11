<script setup lang="ts">
// Pasirenkama kortelė: nuotrauka (jei yra), pavadinimas ir trumpas tekstas.
// Papildomi veiksmai (pvz. „Nuotraukos“) – per slot'ą, po pasirinkimo mygtuku.
withDefaults(
  defineProps<{
    title: string;
    text?: string;
    image?: string;
    alt?: string;
    selected?: boolean;
    // gaminio vaizdas be fono – rodomas visas, neapkirptas
    contain?: boolean;
    // vietoje nuotraukos – tuščias langelis (kai kitos tos pačios eilės kortelės nuotraukas turi)
    placeholder?: boolean;
    // kelios kortelės vienoje eilėje ir telefone – aprašymas ten slepiamas
    compact?: boolean;
  }>(),
  { text: "", image: "", alt: "", selected: false, contain: false, placeholder: false, compact: false },
);

defineEmits<{ select: [] }>();
</script>

<template>
  <div
    class="flex flex-col rounded-lg border-2 overflow-hidden bg-white transition-all duration-200"
    :class="selected ? 'border-red-main shadow-lg' : 'border-gray-200 hover:border-gray-400'"
  >
    <button
      type="button"
      :aria-pressed="selected"
      class="flex flex-col flex-1 text-left hover:cursor-pointer"
      @click="$emit('select')"
    >
      <div v-if="image || placeholder" class="relative w-full bg-gray-100">
        <NuxtImg
          v-if="image"
          :src="image"
          :alt="alt || title"
          sizes="sm:50vw md:33vw lg:260px"
          loading="lazy"
          class="w-full aspect-4/3"
          :class="contain ? 'object-contain scale-110' : 'object-cover'"
        />
        <div v-else class="w-full aspect-4/3 flex items-center justify-center text-gray-400">
          <svg class="w-10 h-10 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M6 18 18 6" stroke-linecap="round" />
          </svg>
        </div>
        <span
          v-if="selected"
          class="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-red-main text-white"
        >
          <svg class="w-4 h-4 fill-none stroke-current stroke-3" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12 5 5 9-10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
      <div class="flex flex-col gap-1 p-3">
        <span class="font-bold" :class="selected ? 'text-red-main' : ''">{{ title }}</span>
        <span v-if="text" class="text-sm text-gray-600" :class="compact ? 'hidden sm:block' : ''">{{ text }}</span>
      </div>
    </button>
    <slot />
  </div>
</template>

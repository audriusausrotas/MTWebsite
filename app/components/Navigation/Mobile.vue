<script setup lang="ts">
const props = defineProps(["currentPath", "currentLinks", "adminLinks"]);

const isMenuOpen = ref<boolean>(false);
const optionsOpen = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col gap-1 sm:hidden">
    <NuxtImg
      @click="isMenuOpen = !isMenuOpen"
      src="/icons/hamburger.svg"
      width="24"
      height="24"
      decoding="auto"
      loading="lazy"
      :ismap="true"
    />

    <div v-if="isMenuOpen" class="flex flex-col">
      <div v-for="link in props.currentLinks" :key="link.name">
        <NuxtLink
          :to="link.link"
          class="rounded-md flex gap-1 px-2"
          :class="props.currentPath === link.name ? 'bg-red-full text-white' : ''"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
      <div v-if="props.adminLinks">
        <div class="flex items-center gap-1 rounded-md px-2">
          <p @click="optionsOpen = !optionsOpen">Admin</p>
          <NuxtImg
            src="/icons/arrowDown.svg"
            width="8"
            height="8"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
        </div>

        <div v-if="optionsOpen" class="flex flex-col pl-4">
          <NuxtLink
            v-for="lnk in props.adminLinks"
            :key="lnk.name"
            :to="lnk.link"
            class="px-2 py-1 rounded-md"
            :class="props.currentPath === lnk.name ? 'bg-red-full text-white' : ''"
          >
            {{ lnk.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

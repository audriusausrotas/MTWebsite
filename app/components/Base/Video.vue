<script setup lang="ts">
// Fono video: serveris ir telefonai gauna tik poster nuotrauką; video įkeliamas
// tik plačiame ekrane ir jei lankytojas neprašo mažinti judesio
interface Props {
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 440,
});

const VIDEO = "/video/MTLOOP3.mp4";
const POSTER = "/video/MTLOOP3-poster.jpg";

const showVideo = ref(false);
onMounted(() => {
  showVideo.value = window.matchMedia(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  ).matches;
});
</script>

<template>
  <!-- max-h-svh: aukštis niekada neviršija ekrano aukščio -->
  <div class="relative w-full max-h-svh overflow-hidden" :style="{ height: height + 'px' }">
    <NuxtImg
      :src="POSTER"
      alt=""
      sizes="sm:100vw md:100vw lg:100vw xl:100vw"
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <!-- be poster: kol video kraunasi, matoma po juo esanti nuotrauka (kitaip ji atsisiųstų antrą kartą) -->
    <video
      v-if="showVideo"
      :src="VIDEO"
      autoplay
      muted
      loop
      playsinline
      disablepictureinpicture
      aria-hidden="true"
      class="absolute inset-0 w-full h-full object-cover"
    ></video>
  </div>
</template>

<style scoped></style>

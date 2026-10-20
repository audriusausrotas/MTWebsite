<script setup lang="ts">
// Įmonės vieta (ta pati, kurią rodo žemėlapis) – maršrutui Google Maps ir Waze programėlėse
const LAT = 54.562596;
const LNG = 23.350908;

const googleLink = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
const wazeLink = `https://waze.com/ul?ll=${LAT},${LNG}&navigate=yes`;
</script>

<template>
  <div class="relative">
    <iframe
      title="Moderni Tvora – Google Maps"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2313.3492495316086!2d23.35090847672694!3d54.56259618303032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e1333c44313cc1%3A0x696d941962a243c!2sModerni%20tvora!5e0!3m2!1sen!2slt!4v1698226287802!5m2!1sen!2slt"
      width="100%"
      height="400"
      style="border: 0"
      :allowfullscreen="true"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <div class="absolute bottom-6 right-4 flex flex-wrap justify-end gap-2">
      <a
        :href="googleLink"
        target="_blank"
        rel="noopener noreferrer"
        class="h-10 px-4 flex items-center rounded-md bg-white text-sm font-semibold shadow-lg hover:text-red-main transition-colors"
      >
        {{ $t("map.google") }}
      </a>
      <a
        :href="wazeLink"
        target="_blank"
        rel="noopener noreferrer"
        class="h-10 px-4 flex items-center rounded-md bg-white text-sm font-semibold shadow-lg hover:text-red-main transition-colors"
      >
        {{ $t("map.waze") }}
      </a>
    </div>
  </div>
</template>

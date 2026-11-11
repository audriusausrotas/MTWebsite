<script setup lang="ts">
// Du biurai – žemėlapis perjungiamas mygtukais; maršruto nuorodos atidaro Google Maps ir Waze programėles
const { t } = useI18n();

// Marijampolės biuras (tikslus įmonės taškas žemėlapyje)
const LAT = 54.562596;
const LNG = 23.350908;

const offices = computed(() => {
  const kaunas = encodeURIComponent(t("contacts.ofiso2Adresas"));
  return [
    {
      key: "marijampole",
      city: t("contacts.offices.marijampole"),
      address: t("contacts.registracijosAdresas"),
      embed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2313.3492495316086!2d23.35090847672694!3d54.56259618303032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e1333c44313cc1%3A0x696d941962a243c!2sModerni%20tvora!5e0!3m2!1sen!2slt!4v1698226287802!5m2!1sen!2slt",
      google: `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`,
      waze: `https://waze.com/ul?ll=${LAT},${LNG}&navigate=yes`,
    },
    {
      key: "kaunas",
      city: t("contacts.offices.kaunas"),
      address: t("contacts.ofiso2Adresas"),
      embed: `https://www.google.com/maps?q=${kaunas}&z=15&output=embed`,
      google: `https://www.google.com/maps/dir/?api=1&destination=${kaunas}`,
      waze: `https://waze.com/ul?q=${kaunas}&navigate=yes`,
    },
  ];
});

const activeKey = ref("marijampole");
const office = computed(
  () => offices.value.find((item) => item.key === activeKey.value) ?? offices.value[0]!,
);
</script>

<template>
  <div class="flex flex-col">
    <div class="grid grid-cols-2">
      <button
        v-for="item in offices"
        :key="item.key"
        type="button"
        :aria-pressed="activeKey === item.key"
        class="flex flex-col items-start gap-1 px-4 py-3 text-left border-b-4 transition-colors hover:cursor-pointer"
        :class="
          activeKey === item.key
            ? 'border-red-main bg-gray-100'
            : 'border-transparent hover:bg-gray-50'
        "
        @click="activeKey = item.key"
      >
        <span class="font-semibold" :class="activeKey === item.key ? 'text-red-main' : ''">
          {{ item.city }}
        </span>
        <span class="text-sm text-gray-600">{{ item.address }}</span>
      </button>
    </div>
    <div class="relative">
      <iframe
        :key="office.key"
        :title="`Moderni Tvora – ${office.city}`"
        :src="office.embed"
        width="100%"
        height="400"
        style="border: 0"
        :allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <div class="absolute bottom-6 right-4 flex flex-wrap justify-end gap-2">
        <a
          :href="office.google"
          target="_blank"
          rel="noopener noreferrer"
          class="h-10 px-4 flex items-center rounded-md bg-white text-sm font-semibold shadow-lg hover:text-red-main transition-colors"
        >
          {{ $t("map.google") }}
        </a>
        <a
          :href="office.waze"
          target="_blank"
          rel="noopener noreferrer"
          class="h-10 px-4 flex items-center rounded-md bg-white text-sm font-semibold shadow-lg hover:text-red-main transition-colors"
        >
          {{ $t("map.waze") }}
        </a>
      </div>
    </div>
  </div>
</template>

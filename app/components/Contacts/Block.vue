<script setup lang="ts">
const requestHandler = () => {};
</script>

<template>
  <div class="flex justify-between gap-8 w-full max-w-default px-4 m-auto">
    <div class="flex flex-col gap-8 max-w-130 items-start">
      <h2 class="text-4xl font-medium">Susisiekite su mumis!</h2>
      <BaseButton @click="requestHandler">Siųsti užklausą</BaseButton>
      <p class="text-justify max-w-100">
        Mūsų profesionalų komanda atsakys į visus jums rūpimus klausimus, pakonsultuos ir pateiks
        individualų pasiūlymą, atitinkantį jūsų poreikius.
      </p>
    </div>
    <div class="flex flex-col gap-8 max-w-130 text-xl">
      <a :href="`tel:${$t('contacts.ofisoTelNr')}`" class="flex gap-4 items-center group">
        <img src="/icons/phone.svg" alt="" />
        <span class="group-hover:border-black border-b-2 border-transparent transition-colors">{{
          $t("contacts.ofisoTelNr")
        }}</span>
      </a>
      <a
        :href="`https://maps.google.com/?q=${$t('contacts.registracijosAdresas')}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex gap-4 items-center group"
      >
        <img src="/icons/location.svg" alt="" />
        <span class="group-hover:border-black border-b-2 border-transparent transition-colors"
          >Męs įsikūrę: {{ $t("contacts.registracijosAdresas") }}</span
        >
      </a>
      <a
        :href="`https://maps.google.com/?q=${$t('contacts.ofiso2Adresas')}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex gap-4 items-center group"
      >
        <img src="/icons/location.svg" alt="" />
        <span class="group-hover:border-black border-b-2 border-transparent transition-colors"
          >Męs įsikūrę: {{ $t("contacts.ofiso2Adresas") }}</span
        >
      </a>
      <a
        :href="`mailto:${$t('contacts.ofisoElPastas') + '@gmail.com'}`"
        class="flex gap-4 items-center group"
      >
        <img src="/icons/email.svg" alt="" />
        <span class="group-hover:border-black border-b-2 border-transparent transition-colors">{{
          $t("contacts.ofisoElPastas") + "@modernitvora.lt"
        }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped></style>

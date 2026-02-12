<script setup lang="ts">
const requestHandler = () => {};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-default m-auto">
    <div class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center md:text-left">Susisiekite su mumis!</h2>
      <p class="text-justify w-full md:max-w-100">
        Mūsų profesionalų komanda atsakys į visus jums rūpimus klausimus, pakonsultuos ir pateiks
        individualų pasiūlymą, atitinkantį jūsų poreikius.
      </p>
      <BaseButton @click="requestHandler" width="w-full md:w-48">Siųsti užklausą</BaseButton>
    </div>
    <div class="flex flex-col gap-8 text-xl w-fit md:w-full md:m-0 m-auto">
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

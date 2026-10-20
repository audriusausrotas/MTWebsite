<script setup lang="ts">
const { t } = useI18n();

const email = "info@modernitvora.lt";
const mapLink = (address: string) => `https://maps.google.com/?q=${encodeURIComponent(address)}`;

// Kol nėra užklausų formos – laiškas į info@
const inquiryLink = computed(
  () => `mailto:${email}?subject=${encodeURIComponent(t("contacts.emailSubject"))}`,
);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-default m-auto">
    <div class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center md:text-left">{{ $t("contacts.title") }}</h2>
      <p class="text-justify w-full md:max-w-100">{{ $t("contacts.text") }}</p>
      <BaseButton :href="inquiryLink" width="w-full md:w-48">{{ $t("contacts.button") }}</BaseButton>
    </div>
    <div class="flex flex-col gap-8 text-xl w-fit md:w-full md:m-0 m-auto">
      <a
        :href="`tel:${$t('contacts.ofisoTelNr').replaceAll(' ', '')}`"
        class="flex gap-4 items-center group"
      >
        <img src="/icons/phone.svg" alt="" />
        <span class="group-hover:border-black border-b-2 border-transparent transition-colors">{{
          $t("contacts.ofisoTelNr")
        }}</span>
      </a>
      <a
        :href="mapLink($t('contacts.registracijosAdresas'))"
        target="_blank"
        rel="noopener noreferrer"
        class="flex gap-4 items-center group"
      >
        <img src="/icons/location.svg" alt="" />
        <span class="group-hover:border-black border-b-2 border-transparent transition-colors">{{
          $t("contacts.registracijosAdresas")
        }}</span>
      </a>
      <a
        :href="mapLink($t('contacts.ofiso2Adresas'))"
        target="_blank"
        rel="noopener noreferrer"
        class="flex gap-4 items-center group"
      >
        <img src="/icons/location.svg" alt="" />
        <span class="group-hover:border-black border-b-2 border-transparent transition-colors">{{
          $t("contacts.ofiso2Adresas")
        }}</span>
      </a>
      <a :href="`mailto:${email}`" class="flex gap-4 items-center group">
        <img src="/icons/email.svg" alt="" />
        <span class="group-hover:border-black border-b-2 border-transparent transition-colors">{{
          email
        }}</span>
      </a>
    </div>
  </div>
</template>

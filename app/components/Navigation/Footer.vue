<script setup lang="ts">
const { t } = useI18n();

const year = new Date().getFullYear();
const mapLink = (address: string) => `https://maps.google.com/?q=${encodeURIComponent(address)}`;

const legal = [
  "taisykles",
  "pristatymas-ir-grazinimas",
  "privatumo-politika",
  "finansuojamas-projektas",
];
</script>

<template>
  <footer class="text-white bg-stone-900 pt-12 pb-8 print:hidden w-full">
    <div class="max-w-default w-full m-auto px-4 flex flex-col gap-8">
      <!-- Logotipas ir teisės -->
      <div class="flex flex-col items-center gap-4 text-center">
        <NuxtLinkLocale to="/" aria-label="Moderni Tvora">
          <img src="/icons/logo.svg" alt="Moderni Tvora" width="140" height="84" />
        </NuxtLinkLocale>
        <p class="text-sm text-stone-400">©{{ year }} Moderni Tvora. {{ $t("footer.rights") }}</p>
      </div>

      <div class="border-t border-white/15 w-full"></div>

      <!-- Rekvizitai ir kontaktai -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-6 [&_img]:shrink-0 [&_img]:self-start [&_img]:mt-0.5"
      >
        <div class="flex flex-col gap-3">
          <div class="flex gap-3">
            <img src="/icons/business.svg" alt="" width="20" height="20" />
            <p>{{ $t("footer.companyCode") }}: <span class="whitespace-nowrap">305174431</span></p>
          </div>
          <div class="flex gap-3">
            <img src="/icons/tag.svg" alt="" width="20" height="20" />
            <p>{{ $t("footer.vatCode") }}: <span class="whitespace-nowrap">LT100013165913</span></p>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex gap-3">
            <img src="/icons/bank.svg" alt="" width="20" height="20" />
            <p>{{ $t("footer.bank") }}: <span class="whitespace-nowrap">Swedbank AB</span></p>
          </div>
          <div class="flex gap-3">
            <img src="/icons/bank.svg" alt="" width="20" height="20" />
            <p>
              {{ $t("footer.account") }}: <span class="whitespace-nowrap">LT247300010158952845</span>
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <a
            :href="`tel:${t('contacts.ofisoTelNr').replaceAll(' ', '')}`"
            class="flex gap-3 w-fit hover:text-red-600 transition-colors"
          >
            <img src="/icons/call.svg" alt="" width="20" height="20" />
            <span>{{ $t("contacts.ofisoTelNr") }}</span>
          </a>
          <a
            href="mailto:info@modernitvora.lt"
            class="flex gap-3 w-fit hover:text-red-600 transition-colors"
          >
            <img src="/icons/mailFooter.svg" alt="" width="20" height="20" />
            <span>info@modernitvora.lt</span>
          </a>
        </div>

        <div class="flex flex-col gap-3">
          <a
            v-for="key in ['registracijosAdresas', 'ofiso2Adresas']"
            :key="key"
            :href="mapLink(t(`contacts.${key}`))"
            target="_blank"
            rel="noopener noreferrer"
            class="flex gap-3 w-fit hover:text-red-600 transition-colors"
          >
            <img src="/icons/locationFooter.svg" alt="" width="20" height="20" />
            <span>{{ $t(`contacts.${key}`) }}</span>
          </a>
        </div>
      </div>

      <!-- Teisiniai puslapiai ir Facebook: vienas blokas per vidurį -->
      <div
        class="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pt-6 border-t border-white/10 text-sm text-stone-400"
      >
        <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <NuxtLinkLocale
            v-for="page in legal"
            :key="page"
            :to="`/${page}`"
            class="hover:text-white transition-colors"
          >
            {{ t(`menu.${page}`) }}
          </NuxtLinkLocale>
        </nav>
        <a
          href="https://www.facebook.com/ModerniTvora"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          class="w-9 h-9 shrink-0 flex items-center justify-center border border-white/40 text-white transition-colors hover:bg-red-main hover:border-red-main"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

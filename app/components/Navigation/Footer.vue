<script setup lang="ts">
import { navigation } from "~/config/navigation";

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
  <footer class="text-white bg-black pt-12 pb-8 print:hidden w-full">
    <div class="max-w-default w-full m-auto px-4 flex flex-col gap-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div class="flex flex-col gap-4">
          <h2 class="font-semibold text-red-main uppercase tracking-wide text-sm">
            {{ $t("footer.menu") }}
          </h2>
          <nav class="flex flex-col gap-2">
            <NuxtLinkLocale
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="hover:text-red-600 transition-colors w-fit"
            >
              {{ t(item.name) }}
            </NuxtLinkLocale>
          </nav>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="font-semibold text-red-main uppercase tracking-wide text-sm">
            {{ $t("menu.kontaktai") }}
          </h2>
          <div class="flex flex-col gap-2">
            <a
              :href="`tel:${t('contacts.ofisoTelNr').replaceAll(' ', '')}`"
              class="flex gap-2 hover:text-red-600 transition-colors"
            >
              <img src="/icons/call.svg" alt="" width="20" height="20" />
              <span>{{ $t("contacts.ofisoTelNr") }}</span>
            </a>

            <a
              href="mailto:info@modernitvora.lt"
              class="flex gap-2 hover:text-red-600 transition-colors"
            >
              <img src="/icons/mailFooter.svg" alt="" width="20" height="20" />
              <span>info@modernitvora.lt</span>
            </a>

            <a
              :href="mapLink(t('contacts.registracijosAdresas'))"
              target="_blank"
              rel="noopener noreferrer"
              class="flex gap-2 hover:text-red-600 transition-colors"
            >
              <img src="/icons/locationFooter.svg" alt="" width="20" height="20" class="self-start mt-0.5" />
              <span>{{ $t("contacts.registracijosAdresas") }}</span>
            </a>
            <a
              :href="mapLink(t('contacts.ofiso2Adresas'))"
              target="_blank"
              rel="noopener noreferrer"
              class="flex gap-2 hover:text-red-600 transition-colors"
            >
              <img src="/icons/locationFooter.svg" alt="" width="20" height="20" class="self-start mt-0.5" />
              <span>{{ $t("contacts.ofiso2Adresas") }}</span>
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="font-semibold text-red-main uppercase tracking-wide text-sm">
            {{ $t("footer.details") }}
          </h2>
          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <img src="/icons/business.svg" alt="" width="20" height="20" />
              <p>{{ $t("footer.companyCode") }}: 305174431</p>
            </div>
            <div class="flex gap-2">
              <img src="/icons/tag.svg" alt="" width="20" height="20" />
              <p>{{ $t("footer.vatCode") }}: LT100013165913</p>
            </div>
            <div class="flex gap-2">
              <img src="/icons/bank.svg" alt="" width="20" height="20" />
              <p>{{ $t("footer.bank") }}: Swedbank AB</p>
            </div>
            <div class="flex gap-2">
              <img src="/icons/bank.svg" alt="" width="20" height="20" class="self-start mt-0.5" />
              <p>
                {{ $t("footer.account") }}: <span class="whitespace-nowrap">LT247300010158952845</span>
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="font-semibold text-red-main uppercase tracking-wide text-sm">
            {{ $t("footer.info") }}
          </h2>
          <div class="flex flex-col gap-2">
            <NuxtLinkLocale
              v-for="page in legal"
              :key="page"
              :to="`/${page}`"
              class="hover:text-red-600 transition-colors w-fit"
            >
              {{ t(`menu.${page}`) }}
            </NuxtLinkLocale>
          </div>
        </div>
      </div>

      <div class="border-t border-red-600 w-full"></div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <img src="/icons/logo.svg" alt="Moderni Tvora" width="100" height="60" />
        <p class="text-sm text-gray-300">©{{ year }} Moderni Tvora. {{ $t("footer.rights") }}</p>
        <a
          href="https://www.facebook.com/ModerniTvora"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          class="w-10 h-10 flex items-center justify-center border-2 border-white transition-colors hover:bg-red-main hover:border-red-main"
        >
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

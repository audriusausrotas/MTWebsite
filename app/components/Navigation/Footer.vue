<script setup lang="ts">
const { t } = useI18n();

const year = new Date().getFullYear();
const mapLink = (address: string) => `https://maps.google.com/?q=${encodeURIComponent(address)}`;
</script>

<template>
  <footer class="flex justify-center text-white bg-black py-8 print:hidden w-full">
    <div class="max-w-default w-full">
      <div class="flex flex-col items-center gap-8">
        <div class="flex flex-col gap-2 items-center">
          <img src="/icons/logo.svg" alt="Moderni Tvora" width="100" height="60" />
          <p>©{{ year }}. {{ $t("footer.rights") }}</p>
        </div>

        <div class="border border-red-600 w-full"></div>

        <div
          class="flex sm:flex-row flex-col lg:justify-between justify-center flex-wrap w-fit sm:w-full gap-6 py-2 px-4"
        >
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
              <img src="/icons/bank.svg" alt="" width="20" height="20" />
              <p>{{ $t("footer.account") }}: LT247300010158952845</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <a :href="`tel:${t('contacts.ofisoTelNr').replaceAll(' ', '')}`" class="flex gap-2 hover:text-red-600">
              <img src="/icons/call.svg" alt="" width="20" height="20" />
              <p>{{ $t("contacts.ofisoTelNr") }}</p>
            </a>

            <a href="mailto:info@modernitvora.lt" class="flex gap-2 hover:text-red-600">
              <img src="/icons/mailFooter.svg" alt="" width="20" height="20" />
              <p>info@modernitvora.lt</p>
            </a>

            <a
              :href="mapLink(t('contacts.registracijosAdresas'))"
              target="_blank"
              rel="noopener noreferrer"
              class="flex gap-2 hover:text-red-600"
            >
              <img src="/icons/locationFooter.svg" alt="" width="20" height="20" />
              <p>{{ $t("contacts.registracijosAdresas") }}</p>
            </a>
            <a
              :href="mapLink(t('contacts.ofiso2Adresas'))"
              target="_blank"
              rel="noopener noreferrer"
              class="flex gap-2 hover:text-red-600"
            >
              <img src="/icons/locationFooter.svg" alt="" width="20" height="20" />
              <p>{{ $t("contacts.ofiso2Adresas") }}</p>
            </a>
            <a
              href="https://www.facebook.com/ModerniTvora"
              target="_blank"
              rel="noopener noreferrer"
              class="flex gap-2 items-center hover:text-red-600"
            >
              <span class="w-5 text-center font-bold">f</span>
              <p>Facebook</p>
            </a>
          </div>
          <div class="flex flex-col gap-2">
            <NuxtLinkLocale to="/taisykles" class="hover:text-red-600 flex gap-2 items-center">
              <span class="w-2 h-2 rounded-full border-2 border-red-600"></span>
              {{ $t("menu.taisykles") }}
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="/pristatymas-ir-grazinimas"
              class="hover:text-red-600 flex gap-2 items-center"
              ><span class="w-2 h-2 rounded-full border-2 border-red-600"></span
              >{{ $t("menu.pristatymas-ir-grazinimas") }}</NuxtLinkLocale
            >
            <NuxtLinkLocale
              to="/privatumo-politika"
              class="hover:text-red-600 flex gap-2 items-center"
              ><span class="w-2 h-2 rounded-full border-2 border-red-600"></span
              >{{ $t("menu.privatumo-politika") }}</NuxtLinkLocale
            >
            <NuxtLinkLocale
              to="/finansuojamas-projektas"
              class="hover:text-red-600 flex gap-2 items-center"
              ><span class="w-2 h-2 rounded-full border-2 border-red-600"></span
              >{{ $t("menu.finansuojamas-projektas") }}</NuxtLinkLocale
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

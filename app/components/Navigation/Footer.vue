<script setup lang="ts"></script>

<template>
  <footer class="flex justify-center text-white bg-black py-8 print:hidden w-full">
    <div class="max-w-370 w-full">
      <div class="flex flex-col items-center gap-8">
        <div class="flex flex-col gap-2 items-center">
          <img src="/icons/logo.svg" alt="Moderni Tvora logotipas" width="100" height="60" />
          <p>©2024. Visos teisės saugomos.</p>
        </div>

        <div class="border border-red-full w-full"></div>

        <div class="flex lg:justify-between justify-center flex-wrap w-full gap-6 py-2 px-4">
          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <img src="/icons/business.svg" alt="Moderni Tvora logotipas" width="20" height="20" />
              <p>Įmonės kodas: 305174431</p>
            </div>
            <div class="flex gap-2">
              <img src="/icons/tag.svg" alt="Moderni Tvora logotipas" width="20" height="20" />
              <p>PVM kodas: LT100013165913</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <img src="/icons/bank.svg" alt="Moderni Tvora logotipas" width="20" height="20" />
              <p>Bankas: Swedbank AB</p>
            </div>
            <div class="flex gap-2">
              <img src="/icons/bank.svg" alt="Moderni Tvora logotipas" width="20" height="20" />
              <p>Banko sąskaita: LT247300010158952845</p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <a href="tel:+37066347011" class="flex gap-2">
              <img src="/icons/call.svg" alt="Moderni Tvora logotipas" width="20" height="20" />
              <p>+370 663 47011</p>
            </a>

            <a href="mailto:info@modernitvora.lt" class="flex gap-2">
              <img
                src="/icons/mailFooter.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
              />
              <p>info@modernitvora.lt</p>
            </a>
          </div>
          <div class="flex flex-col gap-2">
            <a href="" class="flex gap-2">
              <img
                src="/icons/locationFooter.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
              />
              <p>Lauko g. 5, Trakiškiai, Marijampolė, <br /></p>
            </a>
            <a href="" class="flex gap-2">
              <img
                src="/icons/locationFooter.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
              />
              <p>Chemijos g. 4, Kaunas,</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped></style>

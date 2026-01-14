<script setup lang="ts"></script>

<template>
  <footer class="flex justify-center text-white bg-black py-8 print:hidden w-full">
    <div class="max-w-370 w-full">
      <div class="flex flex-col items-center gap-8">
        <div class="flex flex-col items-center">
          <NuxtImg
            src="/images/logoLight.png"
            alt="Moderni Tvora logotipas"
            width="100"
            height="60"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
          <p>©2024. Visos teisės saugomos.</p>
        </div>

        <div class="border border-red-full w-full"></div>

        <div class="flex lg:justify-between justify-center flex-wrap w-full gap-6 py-2">
          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <NuxtImg
                src="/icons/business.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>Įmonės kodas: 305174431</p>
            </div>
            <div class="flex gap-2">
              <NuxtImg
                src="/icons/tag.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>PVM kodas: LT100013165913</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <NuxtImg
                src="/icons/bank.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>Bankas: Swedbank AB</p>
            </div>
            <div class="flex gap-2">
              <NuxtImg
                src="/icons/bank.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>Banko sąskaita: LT247300010158952845</p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <a href="tel:+37066347011" class="flex gap-2">
              <NuxtImg
                src="/icons/call.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>+370 663 47011</p>
            </a>

            <a href="mailto:info@modernitvora.lt" class="flex gap-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                  stroke="red"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                  stroke="red"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>info@modernitvora.lt</p>
            </a>
          </div>
          <div class="flex gap-2 items-start">
            <NuxtImg
              src="/icons/location.svg"
              alt="Moderni Tvora logotipas"
              width="20"
              height="20"
              decoding="auto"
              loading="lazy"
              :ismap="true"
              class="mt-4"
            />
            <p>
              Kauno g. 31, Marijampolė, <br />
              LT-68178, Lietuva
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped></style>

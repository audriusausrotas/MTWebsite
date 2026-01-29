<script setup lang="ts">
useSeo("home.seo.title", "home.seo.description");
const localePath = useLocalePath();

const images = [
  {
    url: "/images/tvoros/daimond6090.jpg",
  },
  {
    url: "/images/tvoros/daimond40105.jpg",
  },
  {
    url: "/images/tvoros/daimond60140.jpg",
  },
  {
    url: "/images/tvoros/daimondVertical.jpg",
  },
  {
    url: "/images/tvoros/dilė.jpg",
  },
  {
    url: "/images/tvoros/dilė.jpg",
  },
  {
    url: "/images/tvoros/eglė.jpg",
  },
  {
    url: "/images/tvoros/plank.jpg",
  },
  {
    url: "/images/tvoros/žaliuzi.jpg",
  },
  {
    url: "/images/zaliuzes/blinds.jpg",
  },
  {
    url: "/images/zaliuzes/blinds2.jpg",
  },
];

const reviews = [
  {
    name: "Rita",
    text: "Džiaugiuosi, kad kreipiausi būtent į šią įmonę. Visi numatyti darbai buvo atlikti laiku, pagal sąmatą ir labai kokybiškai. Montuotojai puikiai išmano savo darbą. Šiaip esu labai smulkmeniška, bet šiuo atveju nebuvo prie ko prikibti :). Dabar kiekvieną dieną žiūriu į savo tvorą ir džiaugiuosi, kokia ji graži. Ypatingas ačiū vadybininkui Hariui už kantrybę, mandagų bendravimą ir profesionalumą. Puikus kolektyvas ir puikus darbas. Jeigu ateityje reikės - kreipsiuosi tik į šią įmonę. Labai atsakingai rekomenduoju.",
    url: "",
  },
  {
    name: "Arvydas",
    text: "Puiki įmonė. Viską atliko kaip pažadėta ir dar anksčiau. Labai kruopštūs ir tvarkingi montuotojai. Gražus darbas. Rekomenduoju.",
    url: "",
  },
  {
    name: "Paulius",
    text: "Visų pirma tai labai norime padėkoti visai MODERNI TVORA KOMANDAI ! Esame naujakūriai, matėme nemažai brigadų, bet kaip savo darba atliko MODERNI TVORA - likome sužavėti. Nuo pačio projekto sudarimo, stulpų įrengimų, iki apdailos, ir pačios tvoros apšvietimo - likome patenkinti 100 % ! Papildomas ačiū Audriui ! Ačiū įmonės vadovui Andriui ! ačiū vyrukams kurie montavo stulpus, ačiū vyrukams kurie įrengė apdaila, ačiū vyrukui kuris puikiai įstatė ir pajungė vartus, ir dar vienas specialus ačiū vyrukams kurie įrengė puikų apšvietimą ! Jūsų visa komanda pateisino įmonės pavadinima MODERNI TVORA",
    url: "",
  },
  {
    name: "Justinas",
    text: "90% rekomendacijos. Laiku ir greitai atliktas darbas, aukšta aptarnavimo kokybė, puikus personalas (tiek vadovai tiek montuotojai). Darbas atliktas nepriekaištingai, nuo užsakymo iki tvoros montavimo. Sėkmės darbuose",
    url: "",
  },
  {
    name: "Mantas",
    text: "Esame dėkingi, Moderni tvora už puikią tvorą. Paskaičiavimai buvo atlikti labai tiksliai, montuojant nieko netrūko. Dėkojame vadybininkui Hariui už sklandžią komunikaciją, taip pat montuotojams. Užsakymas nevėlavo- rezultatas kuo puikiausias, buvo verta kiekvieno išleisto Euro. Rekomenduojame šią įmonę ir linkime jai sėkmės",
    url: "",
  },
  { name: "Sigita", text: "Tvora superine, vyrukai šaunūs, aciu", url: "" },
  {
    name: "Saulius",
    text: "Puiki įmonė. Darbas atliktas puikiai, sulaukėme darbo pabaigos po 3savaičių, tai yra greičiau, nei per sutartą laikotarpį. Konkretumas ir pagalba iš vadybininkų, dėl kilusių klausimų. Ačiū, už atliktą darbą. Rekomenduoju!!!",
    url: "",
  },
];
</script>

<template>
  <div class="flex flex-col gap-24">
    <HomeHeroVideo />

    <section>
      <HomeProducts />
    </section>

    <section>
      <HomeCalculator />
    </section>

    <section class="flex flex-col gap-10 max-w-default px-4 m-auto">
      <div class="flex justify-between">
        <h3 class="text-4xl font-medium">Projektai</h3>
        <BaseArrowButton name="PAMATYTI DAUGIAU" :to="localePath('/galerija')" />
      </div>
      <HomeCrousel :arr="images" />
    </section>

    <section class="flex flex-col gap-20 w-full max-w-default px-4 m-auto">
      <AboutBlock title="Apie mus" :text="$t('about.aprasymas.text')" :url="$t('about.box1.url')">
        <BaseArrowButton name="PLAČIAU" :to="localePath('/apie-mus')" />
      </AboutBlock>
      <AboutCards />
    </section>

    <section>
      <ContactsBlock />
    </section>

    <section class="flex flex-col gap-10 max-w-default w-full px-4 m-auto">
      <h3 class="text-4xl font-medium">Atsiliepimai</h3>
      <HomeCrousel :arr="reviews" :images="false" :speed="5000" :gap="50" />
    </section>

    <section>
      <ContactsMap />
    </section>
  </div>
</template>

<style scoped></style>

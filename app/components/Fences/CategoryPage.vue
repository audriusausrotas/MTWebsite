<script setup lang="ts">
import type { FenceCategoryKey } from "~/composables/useFences";

// Bendras tvorų kategorijos puslapio turinys: įžanga, modeliai (iš MTSoft), kitos kategorijos, kvietimas.
// Duomenis (loadSiteData("fences")) ir SEO pasirūpina pats puslapis.
const props = defineProps<{ category: FenceCategoryKey }>();

const localePath = useLocalePath();
const { groupsOf } = useFences();

const groups = computed(() => groupsOf(props.category));
const others = computed(() => FENCE_CATEGORIES.filter((item) => item.key !== props.category));
</script>

<template>
  <BaseWrapper customStyles="gap-20">
    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">
        {{ $t(`fences.categories.${category}.title`) }}
      </h2>
      <p class="text-justify max-w-200">{{ $t(`fences.categories.${category}.text`) }}</p>

      <!-- greitos nuorodos į modelius -->
      <nav
        v-if="groups.length > 1"
        :aria-label="$t('fences.models')"
        class="flex flex-wrap gap-2 justify-center sm:justify-start"
      >
        <a
          v-for="group in groups"
          :key="group.anchor"
          :href="`#${group.anchor}`"
          class="border-2 border-gray-200 px-4 py-2 text-sm font-semibold transition-colors hover:border-red-main hover:text-red-main"
        >
          {{ group.name }}
        </a>
      </nav>
    </section>

    <section v-if="groups.length" class="flex flex-col gap-16">
      <FencesSheetFenceCard
        v-for="(group, index) in groups"
        :key="group.fence._id"
        :group="group"
        :reverse="index % 2 === 1"
      />
    </section>

    <!-- kategorijoje (dar) nėra tinklapyje rodomų tvorų -->
    <section v-else class="bg-gray-100 rounded-lg p-8 md:p-12 flex flex-col gap-6 items-center text-center">
      <h2 class="text-3xl font-medium">{{ $t("fences.empty.title") }}</h2>
      <p class="max-w-150">{{ $t("fences.empty.text") }}</p>
      <BaseButton :to="localePath('/kontaktai')">{{ $t("fences.constact") }}</BaseButton>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("fences.other") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <FencesCategoryCard
          v-for="item in others"
          :key="item.key"
          :title="$t(`menu.${item.key}`)"
          :image="item.image"
          :to="localePath(`/tvoros/${item.key}`)"
        />
      </div>
    </section>

    <FencesCta />
  </BaseWrapper>
</template>

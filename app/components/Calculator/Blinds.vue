<script setup lang="ts">
// Lauko žaliuzės: tipas, kryptis, spalva ir angų matmenys (cm). Žaliuzės skaičiuojamos atskirai nuo tvorų.
const { config, selection, openingValid, addOpening, removeOpening } = useCalculator();

const blinds = computed(() => config.value!.blinds!);
const value = computed(() => selection.value.blinds);

const counts = computed(() => Array.from({ length: blinds.value.maxCount }, (_, index) => index + 1));

// laukas paliktas tuščias – dar ne klaida
const invalid = (opening: (typeof value.value.openings)[number]) =>
  !!(opening.widthText.trim() && opening.heightText.trim()) && !openingValid(opening);
</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-4">
      <h3 class="text-xl font-medium">{{ $t("calc.blinds.type") }}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <CalculatorCard
          v-for="type in blinds.types"
          :key="type.name"
          :title="type.name"
          :text="type.material"
          :selected="value.type === type.name"
          @select="value.type = type.name"
        />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="text-xl font-medium">{{ $t("calc.blinds.direction") }}</h3>
      <div class="flex flex-wrap gap-3">
        <CalculatorChip
          v-for="direction in blinds.directions"
          :key="direction"
          :selected="value.direction === direction"
          @select="value.direction = direction"
        >
          {{ $t(`calc.blinds.${direction}`) }}
        </CalculatorChip>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="text-xl font-medium">{{ $t("calc.color.title") }}</h3>
      <CalculatorColors v-model="value.color" :colors="blinds.colors" />
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="text-xl font-medium">{{ $t("calc.steps.openings") }}</h3>
      <p class="text-gray-600">{{ $t("calc.blinds.openingsHint") }}</p>

      <div
        v-for="(opening, index) in value.openings"
        :key="opening.id"
        class="grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto_auto] gap-3 items-end p-4 border border-gray-200 rounded-lg"
      >
        <div class="flex flex-col gap-1">
          <label :for="`calc-opening-width-${opening.id}`" class="text-sm font-medium">
            {{ $t("calc.blinds.opening", { n: index + 1 }) }} – {{ $t("calc.blinds.width") }}
          </label>
          <input
            :id="`calc-opening-width-${opening.id}`"
            v-model="opening.widthText"
            type="text"
            inputmode="numeric"
            autocomplete="off"
            class="h-12 px-4 border-2 bg-white text-lg focus:outline-none focus:border-red-main"
            :class="invalid(opening) ? 'border-red-main' : 'border-gray-300'"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label :for="`calc-opening-height-${opening.id}`" class="text-sm font-medium">
            {{ $t("calc.blinds.height") }}
          </label>
          <input
            :id="`calc-opening-height-${opening.id}`"
            v-model="opening.heightText"
            type="text"
            inputmode="numeric"
            autocomplete="off"
            class="h-12 px-4 border-2 bg-white text-lg focus:outline-none focus:border-red-main"
            :class="invalid(opening) ? 'border-red-main' : 'border-gray-300'"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label :for="`calc-opening-count-${opening.id}`" class="text-sm font-medium">
            {{ $t("calc.blinds.count") }}
          </label>
          <select
            :id="`calc-opening-count-${opening.id}`"
            v-model.number="opening.count"
            class="h-12 px-3 border-2 border-gray-300 bg-white text-lg focus:outline-none focus:border-red-main"
          >
            <option v-for="count in counts" :key="count" :value="count">{{ count }}</option>
          </select>
        </div>
        <button
          v-if="value.openings.length > 1"
          type="button"
          class="h-12 px-3 text-sm font-semibold text-gray-600 hover:text-red-main hover:cursor-pointer"
          @click="removeOpening(index)"
        >
          {{ $t("calc.blinds.remove") }}
        </button>
      </div>

      <p class="text-sm text-gray-600">
        {{
          $t("calc.blinds.range", {
            wmin: blinds.widthRange.min,
            wmax: blinds.widthRange.max,
            hmin: blinds.heightRange.min,
            hmax: blinds.heightRange.max,
          })
        }}
      </p>

      <button
        v-if="value.openings.length < blinds.maxOpenings"
        type="button"
        class="self-start h-12 px-4 border-2 border-dashed border-gray-400 font-bold text-gray-700 hover:border-red-main hover:text-red-main hover:cursor-pointer"
        @click="addOpening"
      >
        + {{ $t("calc.blinds.add") }}
      </button>
    </div>
  </div>
</template>

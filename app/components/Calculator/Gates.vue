<script setup lang="ts">
import type { GateType } from "#shared/types/calculator";

// Vartai ir varteliai: kiekvieni kuriami atskirai (kaip tvoros) – savo tipas, plotis, automatika arba spyna.
// Užpildas, aukštis ir spalva – redaguojamos tvoros.
const { locale } = useI18n();
const {
  fence,
  gateTypesOf,
  gateWidthsOf,
  hasAutomatics,
  hasLock,
  canAddGate,
  addGate,
  removeGate,
  setGateType,
  setKitHeight,
  isKit,
  kitHeightsOf,
  kitColorsOf,
} = useCalculator();

const types = computed(() => gateTypesOf(fence.value));

const meters = (cm: number) =>
  `${new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", { maximumFractionDigits: 2 }).format(cm / 100)} m`;

const widths = (type: GateType, height: number | null) => gateWidthsOf(fence.value, type, height);

// gatavo segmentinio komplekto aukščiai ir spalvos (spalva – tik prie ne segmentinės tvoros)
const kitHeights = (type: GateType) => kitHeightsOf(fence.value, type);
const kitColors = computed(() => kitColorsOf(fence.value));
</script>

<template>
  <div class="flex flex-col gap-4">
    <p v-if="!fence.gates.length" class="text-gray-600">{{ $t("calc.gates.empty") }}</p>

    <div
      v-for="(gate, index) in fence.gates"
      :key="gate.id"
      class="flex flex-col gap-5 p-4 sm:p-5 border-2 border-gray-200 rounded-lg bg-white"
    >
      <div class="flex items-center justify-between gap-4">
        <h3 class="flex items-center gap-3 text-xl font-bold">
          <span class="w-1.5 h-6 shrink-0 bg-red-main" aria-hidden="true"></span>
          {{ index + 1 }}. {{ $t(`calc.gates.types.${gate.type}`) }}
        </h3>
        <button
          type="button"
          class="shrink-0 text-sm font-semibold text-gray-600 hover:text-red-main hover:cursor-pointer"
          @click="removeGate(index)"
        >
          × {{ $t("calc.fences.remove") }}
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <p class="font-semibold">{{ $t("calc.gates.type") }}</p>
        <div class="flex flex-wrap gap-2">
          <CalculatorChip
            v-for="type in types"
            :key="type"
            :selected="gate.type === type"
            @select="setGateType(gate, type)"
          >
            {{ $t(`calc.gates.types.${type}`) }}
          </CalculatorChip>
        </div>
        <p v-if="isKit(gate.type)" class="text-sm text-gray-600">
          {{ $t("calc.gates.kitText") }}
        </p>
      </div>

      <div v-if="isKit(gate.type) && kitHeights(gate.type).length > 1" class="flex flex-col gap-2">
        <p class="font-semibold">{{ $t("calc.gates.kitHeight") }}</p>
        <div class="flex flex-wrap gap-2">
          <CalculatorChip
            v-for="height in kitHeights(gate.type)"
            :key="height"
            :selected="gate.kitHeight === height"
            @select="setKitHeight(gate, height)"
          >
            {{ meters(height) }}
          </CalculatorChip>
        </div>
      </div>

      <div v-if="widths(gate.type, gate.kitHeight).length" class="flex flex-col gap-2">
        <p class="font-semibold">{{ $t("calc.gates.width") }}</p>
        <div class="flex flex-wrap gap-2">
          <CalculatorChip
            v-for="width in widths(gate.type, gate.kitHeight)"
            :key="width"
            :selected="gate.width === width"
            @select="gate.width = width"
          >
            {{ meters(width) }}
          </CalculatorChip>
        </div>
      </div>

      <div v-if="isKit(gate.type) && kitColors.length" class="flex flex-col gap-2">
        <p class="font-semibold">{{ $t("calc.gates.kitColor") }}</p>
        <CalculatorColors v-model="gate.color" :colors="kitColors" />
      </div>

      <!-- gatavam komplektui – tik jei kainyne jam yra automatika -->
      <div v-if="hasAutomatics(fence, gate)" class="flex flex-col gap-2">
        <p class="font-semibold">{{ $t("calc.gates.automatics") }}</p>
        <div class="flex flex-wrap gap-2">
          <CalculatorChip :selected="gate.automatics" @select="gate.automatics = true">
            {{ $t("calc.gates.withAutomatics") }}
          </CalculatorChip>
          <CalculatorChip :selected="!gate.automatics" @select="gate.automatics = false">
            {{ $t("calc.gates.withoutAutomatics") }}
          </CalculatorChip>
        </div>
      </div>

      <div v-if="hasLock(gate)" class="flex flex-col gap-2">
        <p class="font-semibold">{{ $t("calc.gates.lock") }}</p>
        <div class="flex flex-wrap gap-2">
          <CalculatorChip :selected="gate.lock === 'simple'" @select="gate.lock = 'simple'">
            {{ $t("calc.gates.lockSimple") }}
          </CalculatorChip>
          <CalculatorChip :selected="gate.lock === 'electric'" @select="gate.lock = 'electric'">
            {{ $t("calc.gates.lockElectric") }}
          </CalculatorChip>
        </div>
        <p v-if="gate.lock === 'electric'" class="text-sm text-gray-600">{{ $t("calc.gates.lockElectricText") }}</p>
      </div>
    </div>

    <button
      v-if="canAddGate(fence)"
      type="button"
      class="self-start h-12 px-4 border-2 border-dashed border-gray-400 font-bold text-gray-700 hover:border-red-main hover:text-red-main hover:cursor-pointer"
      @click="addGate"
    >
      + {{ $t("calc.gates.add") }}
    </button>
  </div>
</template>

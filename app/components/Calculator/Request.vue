<script setup lang="ts">
// „Gauti tikslų pasiūlymą“: lankytojo kontaktai ir pageidavimas. Užklausa keliauja į MTSoft „Užklausas“
// (meta-gateway /web/calculations, kanalas „tinklapio forma“) kartu su pasirinkimais; MTSoft prie jos prisega
// tokią pačią sąmatą, kokią lankytojas matė, ir perduoda vadybininkui. AI šios užklausos neskaičiuoja.
const props = defineProps<{
  // pasirinkimų eilutės užklausos laukams
  fields: { label: string; values: string[] }[];
  // sąmatos kaina su PVM, kurią matė lankytojas
  price: number | null;
}>();

const open = defineModel<boolean>({ required: true });

const { t } = useI18n();
const localePath = useLocalePath();
const { request } = useCalculator();
const { gatewayBase } = useRuntimeConfig().public;

const TYPES = ["measure", "clarify", "accept"] as const;

const form = reactive({
  type: "measure" as (typeof TYPES)[number],
  name: "",
  phone: "",
  email: "",
  city: "",
  comment: "",
  consent: false,
  // paslėptas laukas robotams: žmogus jo nemato ir nepildo
  website: "",
});

const sending = ref(false);
const error = ref("");
const done = ref(false);
const number = ref("");

const close = () => {
  if (sending.value) return;
  open.value = false;
  // kitą kartą atidarius – vėl forma
  if (done.value) {
    done.value = false;
    number.value = "";
  }
};

const submit = async () => {
  error.value = "";
  if (!form.phone.trim() && !form.email.trim()) return (error.value = t("calc.request.errorContact"));
  if (!form.consent) return (error.value = t("calc.request.errorConsent"));
  if (!request.value) return (error.value = t("calc.request.error"));

  // robotas užpildė paslėptą lauką – apsimetama, kad išsiųsta
  if (form.website) return (done.value = true);

  sending.value = true;
  try {
    const response = await $fetch<{ data?: { estimate?: string | null } }>(`${gatewayBase}/web/calculations`, {
      method: "POST",
      body: {
        data: {
          calculator: request.value,
          summary: props.fields,
          request: form.type,
          price: props.price,
          customer: {
            first_name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            city: form.city.trim(),
            comment: form.comment.trim(),
          },
        },
      },
    });
    number.value = response?.data?.estimate || "";
    done.value = true;
  } catch (cause) {
    const failure = cause as { status?: number; data?: { errors?: Record<string, string[]> } };
    const messages = Object.values(failure.data?.errors ?? {}).flat();
    error.value =
      failure.status === 429
        ? t("calc.request.errorTooMany")
        : failure.status === 422 && messages.length
          ? [...new Set(messages)].join(" ")
          : t("calc.request.error");
  } finally {
    sending.value = false;
  }
};

const onKey = (event: KeyboardEvent) => {
  if (event.key === "Escape") close();
};

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

const inputClass = "h-12 w-full px-4 border-2 border-gray-300 bg-white focus:outline-none focus:border-red-main";
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[60] flex items-start sm:items-center justify-center overflow-y-auto bg-black/60 p-4"
      @click.self="close"
    >
      <div
        role="dialog"
        aria-modal="true"
        :aria-label="$t('calc.request.title')"
        class="relative w-full max-w-xl my-auto flex flex-col gap-5 p-6 sm:p-8 bg-white rounded-lg shadow-xl"
      >
        <button
          type="button"
          class="absolute top-3 right-3 w-10 h-10 text-2xl leading-none text-gray-500 hover:text-black hover:cursor-pointer"
          :aria-label="$t('calc.request.close')"
          @click="close"
        >
          ×
        </button>

        <template v-if="done">
          <h2 class="text-2xl font-bold">{{ $t("calc.request.doneTitle") }}</h2>
          <p>{{ $t("calc.request.doneText") }}</p>
          <p v-if="number" class="font-bold">{{ $t("calc.request.doneNumber", { number }) }}</p>
          <BaseButton width="w-full" @click="close">{{ $t("calc.request.close") }}</BaseButton>
        </template>

        <form v-else class="flex flex-col gap-5" novalidate @submit.prevent="submit">
          <div class="flex flex-col gap-2 pr-8">
            <h2 class="text-2xl font-bold">{{ $t("calc.request.title") }}</h2>
            <p class="text-gray-600">{{ $t("calc.request.intro") }}</p>
          </div>

          <fieldset class="flex flex-col gap-2">
            <legend class="font-medium mb-2">{{ $t("calc.request.want") }}</legend>
            <div class="flex flex-wrap gap-2">
              <CalculatorChip v-for="type in TYPES" :key="type" :selected="form.type === type" @select="form.type = type">
                {{ $t(`calc.request.${type}`) }}
              </CalculatorChip>
            </div>
          </fieldset>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label class="flex flex-col gap-1 text-sm font-medium">
              {{ $t("calc.request.name") }}
              <input v-model="form.name" type="text" autocomplete="name" maxlength="100" :class="inputClass" />
            </label>
            <label class="flex flex-col gap-1 text-sm font-medium">
              {{ $t("calc.request.city") }}
              <input v-model="form.city" type="text" autocomplete="street-address" maxlength="100" :class="inputClass" />
            </label>
            <label class="flex flex-col gap-1 text-sm font-medium">
              {{ $t("calc.request.phone") }}
              <input v-model="form.phone" type="tel" autocomplete="tel" maxlength="40" :class="inputClass" />
            </label>
            <label class="flex flex-col gap-1 text-sm font-medium">
              {{ $t("calc.request.email") }}
              <input v-model="form.email" type="email" autocomplete="email" maxlength="120" :class="inputClass" />
            </label>
          </div>
          <p class="text-sm text-gray-600 -mt-3">{{ $t("calc.request.contactHint") }}</p>

          <label class="flex flex-col gap-1 text-sm font-medium">
            {{ $t("calc.request.comment") }}
            <textarea
              v-model="form.comment"
              rows="3"
              maxlength="3000"
              class="w-full px-4 py-3 border-2 border-gray-300 bg-white focus:outline-none focus:border-red-main"
            ></textarea>
          </label>

          <!-- robotams: žmogui nematomas laukas -->
          <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

          <label class="flex items-start gap-3 text-sm">
            <input v-model="form.consent" type="checkbox" class="mt-1 w-4 h-4 accent-red-main" />
            <span>
              {{ $t("calc.request.consent") }}
              <NuxtLink :to="localePath('/privatumo-politika')" target="_blank" class="text-red-main font-semibold hover:underline">
                {{ $t("calc.request.privacy") }}
              </NuxtLink>
            </span>
          </label>

          <p v-if="error" class="font-medium text-red-main" role="alert">{{ error }}</p>

          <BaseButton width="w-full" :disabled="sending">
            {{ sending ? $t("calc.request.sending") : $t("calc.request.send") }}
          </BaseButton>
        </form>
      </div>
    </div>
  </Teleport>
</template>

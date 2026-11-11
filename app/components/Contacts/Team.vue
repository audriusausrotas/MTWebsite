<script setup lang="ts">
// Darbuotojų kontaktai. Telefonai ir el. pašto vardai – i18n `contacts` (el. paštas = vardas@modernitvora.lt,
// rodomas vardas – tas pats vardas didžiąja raide).
const { t } = useI18n();

const DOMAIN = "modernitvora.lt";

const people = computed(() =>
  [
    { role: "director", name: "direktorius", phone: "direktoriausTelNr" },
    { role: "manager", name: "vadybininkas1", phone: "vadybininko1TelNr" },
    { role: "manager", name: "vadybininkas2", phone: "vadybininko2TelNr" },
    { role: "accountant", name: "buhalte", phone: "buhalterijosTelNr" },
  ].map((person) => {
    const local = t(`contacts.${person.name}`);
    return {
      key: person.name,
      role: t(`contacts.roles.${person.role}`),
      name: local.charAt(0).toUpperCase() + local.slice(1),
      phone: t(`contacts.${person.phone}`),
      email: `${local}@${DOMAIN}`,
    };
  }),
);
</script>

<template>
  <section class="flex flex-col gap-8">
    <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("contacts.teamTitle") }}</h2>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <li
        v-for="person in people"
        :key="person.key"
        class="flex flex-col gap-3 p-6 rounded-lg border border-gray-100 shadow-lg"
      >
        <span class="text-sm font-semibold text-red-main uppercase tracking-wide">
          {{ person.role }}
        </span>
        <span class="text-2xl font-medium">{{ person.name }}</span>
        <a
          :href="`tel:${person.phone.replaceAll(' ', '')}`"
          class="font-medium hover:text-red-main transition-colors"
        >
          {{ person.phone }}
        </a>
        <a
          :href="`mailto:${person.email}`"
          class="break-all hover:text-red-main transition-colors"
        >
          {{ person.email }}
        </a>
      </li>
    </ul>
  </section>
</template>

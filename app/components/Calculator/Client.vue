div
<script setup lang="ts">
const { client } = useCalculations();
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-xl font-bold">Įveskite kliento informaciją</h3>
    <div class="grid grid-cols-4 gap-4">
      <BaseInput
        @onChange="(value: string) => (client.name = value)"
        id="name"
        width="w-full"
        label="Vardas"
        :name="client.name"
      />
      <BaseInput
        @onChange="(value: string) => (client.address = value)"
        id="address"
        width="w-full"
        label="Adresas"
        :name="client.address"
      />
      <BaseInput
        @onChange="(value: string) => (client.phone = value)"
        type="tel"
        id="phone"
        width="w-full"
        label="Telefonas"
        :name="client.phone"
      />
      <BaseInput
        @onChange="(value: string) => (client.email = value)"
        type="email"
        id="email"
        width="w-full"
        label="Elektroninis paštas"
        :name="client.email"
      />
    </div>
  </div>
</template>

<style scoped></style>

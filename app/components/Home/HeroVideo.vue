<template>
  <div class="relative">
    <div class="absolute top-0 left-0 h-225 w-full bg-black/30"></div>
    <BaseVideo :height="900" />
    <div class="relative max-w-default w-full m-auto">
      <h1 class="absolute -top-96 left-4 text-4xl font-medium text-white tracking-wide max-w-120">
        {{ $t("home.title") }}
      </h1>
    </div>
  </div>
</template>

<template>
  <div class="w-full min-h-dvh flex flex-col">
    <NavigationHeader />
    <NavigationMobile />
    <main class="flex-1">
      <slot />
    </main>
    <NavigationFooter />
  </div>
</template>

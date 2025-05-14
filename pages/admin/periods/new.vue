<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <main class="w-full max-w-xl">
    <div class="flex flex-col md:flex-row gap-4 justify-between mb-4">
      <h1 class="text-4xl font-bold text-white">Academic Periods</h1>
    </div>
    <PeriodForm />
  </main>
</template>

<style scoped></style>

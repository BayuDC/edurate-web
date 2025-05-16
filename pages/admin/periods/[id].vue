<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const period = usePeriodStore();

period.id = parseInt(route.params.id as string);
await period.load();

onUnmounted(() => {
  period.reset();
});
</script>

<template>
  <main class="w-full max-w-xl">
    <div class="flex flex-col md:flex-row gap-4 justify-between mb-4">
      <h1 class="text-4xl font-bold text-white">Academic Periods</h1>
    </div>
    <PeriodForm @save="" />
  </main>
</template>

<style scoped></style>

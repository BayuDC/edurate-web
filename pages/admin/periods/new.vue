<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const period = usePeriodStore();

async function onSave() {
  if (await period.create()) {
    await navigateTo('/admin/periods');
  }
}

onUnmounted(() => {
  period.reset();
});
</script>

<template>
  <main class="w-full max-w-xl">
    <div class="flex flex-col md:flex-row gap-4 justify-between mb-4">
      <h1 class="text-4xl font-bold text-white">Academic Periods</h1>
    </div>
    <PeriodForm @save="onSave" />
  </main>
</template>

<style scoped></style>

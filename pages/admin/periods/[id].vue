<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const period = usePeriodStore();
const freeze = ref(true);

period.id = parseInt(route.params.id as string);
await period.load();

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Academic Periods', href: '/admin/periods' },
  { text: `${period.data.name}` },
  //
]);

async function onSave() {
  if (await period.update()) {
    // await navigateTo('/admin/periods');
  }
}

watchImmediate(
  () => route.query.edit,
  v => (freeze.value = v !== 'true')
);

onUnmounted(() => {
  period.reset();
});

const modal = ref<any>(null);
</script>

<template>
  <main class="w-full max-w-xl">
    <div class="flex flex-col md:flex-row gap-4 justify-between mb-4">
      <h1 class="text-4xl font-bold text-white">Academic Periods</h1>
    </div>
    <PeriodForm @save="onSave" :freeze="freeze" @delete="modal.select(period.id, period.data.name)" />
    <PeriodModal ref="modal" @deleted="navigateTo('/admin/periods')" />
  </main>
</template>

<style scoped></style>

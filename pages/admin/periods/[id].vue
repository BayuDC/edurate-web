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
    freeze.value = true;
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
  <Main title="Academic Periods" simple>
    <PeriodForm @save="onSave" :freeze="freeze" @delete="modal.select(period.id, period.data.name)" />
    <Modal store="period" ref="modal" @deleted="navigateTo('/admin/periods')" />
  </Main>
</template>

<style scoped></style>

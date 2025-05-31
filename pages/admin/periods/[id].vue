<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'load-period'],
});

const period = usePeriodStore();
const edit = useRouteQuery('edit');

const freeze = ref(true);
const modal = ref<any>(null);

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Period', href: '/admin/periods' },
  { text: `${period.data.name}` },
  //
]);

async function onSave() {
  if (await period.update()) {
    freeze.value = true;
  }
}

watchImmediate(edit, v => (freeze.value = v !== 'true'));
</script>

<template>
  <Main title="Period Detail" simple>
    <FormPeriod @save="onSave" :freeze="freeze" @delete="modal.select(period.id, period.data.name)" />
    <Modal store="period" ref="modal" @deleted="navigateTo('/admin/periods')" />
  </Main>
</template>

<style scoped></style>

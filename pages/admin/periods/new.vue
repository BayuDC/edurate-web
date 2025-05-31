<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Period', href: '/admin/periods' },
  { text: 'New' },
  //
]);

const alert = useAlertStore();
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
  <Main title="New Period" simple>
    <FormPeriod @save="onSave" />
  </Main>
</template>

<style scoped></style>

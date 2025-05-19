<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Manage Class', href: '/admin/classes' },
  { text: 'New' },
  //
]);

const $class = useClassStore();

async function onSave() {
  if (await $class.create()) {
    await navigateTo('/admin/classes');
  }
}

onUnmounted(() => {
  $class.reset();
});
</script>

<template>
  <Main title="Manage Class" simple>
    <ClassForm @save="onSave" />
  </Main>
</template>

<style scoped></style>

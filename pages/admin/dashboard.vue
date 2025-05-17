<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'gate-admin'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Dashboard' },
  //
]);
</script>

<template>
  <div>Page: admin/dashboard</div>
</template>

<style scoped></style>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'gate-admin'],
});
</script>

<template>
  <div>Page: admin/dashboard</div>
</template>

<style scoped></style>

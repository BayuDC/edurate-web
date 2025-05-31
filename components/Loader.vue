<script setup lang="ts">
const props = defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <span class="loading loading-spinner text-primary" :class="[!loading ? 'invisible' : 'visible']"></span>
</template>

<style scoped></style>

<script setup lang="ts">
const props = defineProps<{
  loading?: boolean;
  isTh?: boolean;
}>();
</script>

<template>
  <component :is="isTh ? 'th' : 'td'" :class="{ 'blur-sm': loading }">
    <slot />
  </component>
</template>

<style scoped></style>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  infinite?: boolean;
}>();
</script>

<template>
  <div class="animate__animated" :class="['animate__' + name, infinite ? 'animate__infinite' : '']">
    <slot />
  </div>
</template>

<style scoped></style>

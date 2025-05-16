<script setup lang="ts">
const props = defineProps<{
  name: string;
  infinite?: boolean;
  duration?: number;
}>();
</script>

<template>
  <div
    :style="{ animationDuration: duration ? duration + 'ms' : undefined }"
    class="animate__animated"
    :class="['animate__' + name, infinite ? 'animate__infinite' : '']"
  >
    <slot />
  </div>
</template>

<style scoped></style>

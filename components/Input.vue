<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: string;
    label?: string;
    error?: string;
  }>(),
  {
    type: 'text',
    label: 'Label',
    error: '',
  }
);

const value = defineModel();
</script>

<template>
  <fieldset class="fieldset w-full">
    <label class="label text-base-content font-bold">{{ label }}</label>
    <input v-model="value" :type="type" class="input w-full" :class="{ 'input-accent': error }" />
    <p v-if="error" class="label text-accent">{{ error }}</p>
  </fieldset>
</template>

<style scoped></style>

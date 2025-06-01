<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    error?: string;
    disabled?: boolean;
    options?: string[];
  }>(),
  {
    label: 'Label',
    error: '',
    options: () => [],
  }
);

const value = defineModel();
</script>

<template>
  <fieldset class="fieldset w-full">
    <label class="label text-base-content font-bold">{{ label }}</label>
    <select
      class="select w-full disabled:cursor-text disabled:text-base-content"
      v-model="value"
      :class="{ 'select-accent': error }"
      :disabled="disabled"
    >
      <option v-for="o in options">{{ o }}</option>
      <option value="">None</option>
    </select>
    <p v-if="error" class="label text-accent">{{ error }}</p>
  </fieldset>
</template>

<style scoped></style>

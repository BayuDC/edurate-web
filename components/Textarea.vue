<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    error?: string;
    disabled?: boolean;
  }>(),
  {
    label: 'Label',
    error: '',
  }
);

const value = defineModel();
</script>

<template>
  <fieldset class="fieldset w-full">
    <label class="label text-base-content font-bold">{{ label }}</label>
    <textarea
      v-model="value"
      class="textarea w-full disabled:cursor-text disabled:text-base-content"
      :class="{ 'textarea-accent': error }"
      :disabled="disabled"
    />
    <p v-if="error" class="label text-accent">{{ error }}</p>
  </fieldset>
</template>

<style scoped></style>

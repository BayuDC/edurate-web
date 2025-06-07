<script setup lang="ts">
const { data } = await useApi<{ teachers: { id: number; name: string; code: string }[] }>(`/teachers`, {
  key: 'teachers',
  default: () => ({ teachers: [] }),
  query: { limit: 100 },
});

const value = defineModel('modelValue', {
  type: String,
  default: '',
});
</script>

<template>
  <select class="select" v-model="value">
    <option disabled value="">Select Teacher</option>
    <option v-for="t in data.teachers" :key="t.id" :value="String(t.id)">{{ t.code }} - {{ t.name }}</option>
  </select>
</template>

<style scoped></style>

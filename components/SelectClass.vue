<script setup lang="ts">
const classId = useRouteQuery<number>('class');

const { data } = await useApi<{ classes: { id: number; name: string }[] }>(`/classes`, {
  key: 'classes',
  default: () => ({ classes: [] }),
});
</script>

<template>
  <select class="select select-secondary" v-model="classId">
    <!-- <option selected disabled>Select Class</option> -->
    <option v-for="c in data.classes" :value="c.id">{{ c.name }}</option>
  </select>
</template>

<style scoped></style>

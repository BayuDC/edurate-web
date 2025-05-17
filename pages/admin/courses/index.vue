<script setup lang="ts">
import { Icon } from '@iconify/vue';

definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Manage Course' },
  //
]);

const { data, refresh } = await useApi<{ courses: any[] }>('/courses', {
  default: () => ({ courses: [] }),
});
</script>

<template>
  <Main title="Manage Course">
    <Table :columns="['Code', 'Name', 'Description']">
      <TableRow v-for="c in data.courses" :key="c.id" :path="`/admin/courses/${c.id}`" :delete="() => {}">
        <th>{{ c.id }}</th>
        <td>{{ c.code }}</td>
        <td>{{ c.name }}</td>
        <td>{{ c.description }}</td>
      </TableRow>
    </Table>
  </Main>
</template>

<style scoped></style>

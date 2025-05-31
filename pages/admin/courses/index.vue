<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Course' },
  //
]);

const { data, refresh } = await useApi<{ courses: any[] }>('/courses', {
  default: () => ({ courses: [] }),
});

const modal = ref<any>(null);
</script>

<template>
  <Main title="Course List">
    <Table :columns="['Code', 'Name', 'Description']">
      <TableRow
        v-for="c in data.courses"
        :key="c.id"
        :path="`/admin/courses/${c.id}`"
        :delete="() => modal?.select(c.id, c.code)"
      >
        <th>{{ c.id }}</th>
        <td>{{ c.code }}</td>
        <td>{{ c.name }}</td>
        <td>{{ c.description }}</td>
      </TableRow>
    </Table>

    <Modal store="course" ref="modal" @deleted="refresh" />
  </Main>
</template>

<style scoped></style>

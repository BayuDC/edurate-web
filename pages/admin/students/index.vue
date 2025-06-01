<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/admin' },
  { text: 'Student' },
  //
]);

const { data, refresh } = await useApi<{ students: any[] }>('/students', {
  default: () => ({ students: [] }),
});

const modal = ref<any>(null);
</script>

<template>
  <Main title="Student List">
    <Table :columns="['Code', 'Name']">
      <TableRow
        v-for="s in data.students"
        :key="s.id"
        :path="`/admin/students/${s.id}`"
        :delete="() => modal?.select(s.id, s.code)"
      >
        <th>{{ s.id }}</th>
        <td>{{ s.code }}</td>
        <td>{{ s.name }}</td>
      </TableRow>
    </Table>

    <Modal store="student" ref="modal" @deleted="refresh" />
  </Main>
</template>

<style scoped></style>

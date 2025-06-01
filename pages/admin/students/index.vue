<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/admin' },
  { text: 'Student' },
  //
]);

const page = useRouteQuery<number>('page', 1);
const { data, refresh, pending } = await useApi<{ students: any[]; meta: any }>('/students', {
  key: 'student-lists',
  default: () => ({ students: [], meta: {} }),
  query: { limit: 10, page },
});

const modal = ref<any>(null);
</script>

<template>
  <Main title="Student List">
    <Table :columns="['Code', 'Name', 'Gender', 'Birth Info', 'Phone']">
      <TableRow
        v-for="s in data.students"
        :key="s.id"
        :path="`/admin/students/${s.id}`"
        :delete="() => modal?.select(s.id, s.code)"
        :loading="pending"
      >
        <TableCell :loading="pending" isTh>{{ s.id }}</TableCell>
        <TableCell :loading="pending">{{ s.code }}</TableCell>
        <TableCell :loading="pending">{{ s.name }}</TableCell>
        <TableCell :loading="pending">{{ s.profile.gender }}</TableCell>
        <TableCell :loading="pending">{{ s.profile.birthPlace }}, {{ s.profile.birthDate }}</TableCell>
        <TableCell :loading="pending">{{ s.profile.phone }}</TableCell>
      </TableRow>
    </Table>

    <div class="mt-4">
      <Pagination v-bind="resolveMeta(data.meta)" />
    </div>

    <Modal store="student" ref="modal" @deleted="refresh" />
  </Main>
</template>

<style scoped></style>

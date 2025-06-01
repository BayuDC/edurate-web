<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/admin' },
  { text: 'Teacher' },
  //
]);

const page = useRouteQuery<number>('page', 1);
const { data, refresh, pending } = await useApi<{ teachers: any[]; meta: any }>('/teachers', {
  key: 'teacher-lists',
  default: () => ({ teachers: [], meta: {} }),
  query: { limit: 10, page },
});

const modal = ref<any>(null);
</script>

<template>
  <Main title="Teacher List">
    <Table :columns="['Code', 'Name', 'Gender', 'Birth Info', 'Phone']">
      <TableRow
        v-for="t in data.teachers"
        :key="t.id"
        :path="`/admin/teachers/${t.id}`"
        :delete="() => modal?.select(t.id, t.code)"
        :loading="pending"
      >
        <TableCell :loading="pending" isTh>{{ t.id }}</TableCell>
        <TableCell :loading="pending">{{ t.code }}</TableCell>
        <TableCell :loading="pending">{{ t.name }}</TableCell>
        <TableCell :loading="pending">{{ t.profile.gender }}</TableCell>
        <TableCell :loading="pending">{{ t.profile.birthPlace }}, {{ t.profile.birthDate }}</TableCell>
        <TableCell :loading="pending">{{ t.profile.phone }}</TableCell>
      </TableRow>
    </Table>

    <div class="mt-4">
      <Pagination v-bind="resolveMeta(data.meta)" />
    </div>

    <Modal store="teacher" ref="modal" @deleted="refresh" />
  </Main>
</template>

<style scoped></style>

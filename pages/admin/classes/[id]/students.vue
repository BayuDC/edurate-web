<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'load-class'],
});

const $class = useClassStore();

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Class', href: '/admin/classes' },
  { text: `${$class.data.name}`, href: `/admin/classes/${$class.id}` },
  { text: 'Students' },
]);

const page = useRouteQuery<number>('page', 1);

const { data, pending } = await useApi<{ students: any[]; meta: any }>(`/classes/${$class.id}/students`, {
  key: 'class-students',
  query: { limit: 10, page },
  default: () => ({ students: [], meta: {} }),
});
</script>

<template>
  <Main title="Student List" disable-add-button>
    <Table :columns="['Code', 'Name', 'Gender', 'Birth Info', 'Phone']">
      <tr v-for="s in data?.students" :key="s.id">
        <TableCell :loading="pending" isTh>{{ s.id }}</TableCell>
        <TableCell :loading="pending">{{ s.code }}</TableCell>
        <TableCell :loading="pending">{{ s.name }}</TableCell>
        <TableCell :loading="pending">{{ s.profile.gender }}</TableCell>
        <TableCell :loading="pending">{{ s.profile.birthPlace }}, {{ s.profile.birthDate }}</TableCell>
        <TableCell :loading="pending">{{ s.profile.phone }}</TableCell>

        <td><Loader :loading="pending" /></td>
      </tr>
    </Table>
    <div class="mt-4">
      <Pagination v-bind="resolveMeta(data.meta)" />
    </div>
  </Main>
</template>

<style scoped></style>

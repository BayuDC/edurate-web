<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Manage Class' },
  //
]);
const { data, refresh } = await useApi<{ classes: any[] }>('/classes', {
  default: () => ({ classes: [] }),
});

const modal = ref<any>(null);
</script>

<template>
  <Main title="Manage Class">
    <Table :columns="['Name']">
      <TableRow
        v-for="c in data.classes"
        :key="c.id"
        :path="`/admin/classes/${c.id}`"
        :delete="() => modal?.select(c.id, c.name)"
      >
        <th>{{ c.id }}</th>
        <td>{{ c.name }}</td>
      </TableRow>
    </Table>

    <ClassModal ref="modal" @deleted="refresh" />
  </Main>
</template>

<style scoped></style>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Period' },
  //
]);

const { data, refresh } = await useApi<{ periods: any[] }>('/periods', {
  default: () => ({ periods: [] }),
});

const modal = ref<any>(null);
</script>

<template>
  <Main title="Academic Periods">
    <Table :columns="['Name', 'Start Date', 'End Date', 'Status']">
      <TableRow
        v-for="p in data.periods"
        :key="p.id"
        :path="`/admin/periods/${p.id}`"
        :delete="() => modal?.select(p.id, p.name)"
      >
        <th>{{ p.id }}</th>
        <td>{{ p.name }}</td>
        <td>{{ p.startDate }}</td>
        <td>{{ p.endDate }}</td>
        <td><input type="checkbox" :checked="false" class="toggle toggle-primary" /></td>
      </TableRow>
    </Table>

    <Modal store="period" ref="modal" @deleted="refresh" />
  </Main>
</template>

<style scoped></style>

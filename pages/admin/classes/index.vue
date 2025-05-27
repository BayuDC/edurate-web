<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Class' },
  //
]);
const { data, refresh } = await useApi<{ classes: any[] }>('/classes', {
  default: () => ({ classes: [] }),
});

const modal = ref<any>(null);
</script>

<template>
  <Main title="Class List">
    <Table :columns="['Name', 'Menu']">
      <TableRow
        v-for="c in data.classes"
        :key="c.id"
        :path="`/admin/classes/${c.id}`"
        :delete="() => modal?.select(c.id, c.name)"
      >
        <th>{{ c.id }}</th>
        <td>{{ c.name }}</td>
        <td>
          <div class="flex gap-2">
            <NuxtLink :to="`/admin/classes/${c.id}/students`" class="btn btn-primary btn-soft btn-sm">
              Students List
            </NuxtLink>
            <NuxtLink :to="`/admin/classes/${c.id}/enroll`" class="btn btn-secondary btn-soft btn-sm">
              Enrollment
            </NuxtLink>
          </div>
        </td>
      </TableRow>
    </Table>

    <!-- <ClassModal ref="modal" @deleted="refresh" /> -->
    <Modal store="class" ref="modal" @deleted="refresh" />
  </Main>
</template>

<style scoped></style>

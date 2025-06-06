<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/admin' },
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
    <Table :columns="['Code', 'Name', 'Menu']">
      <TableRow
        v-for="c in data.courses"
        :key="c.id"
        :path="`/admin/courses/${c.id}`"
        :delete="() => modal?.select(c.id, c.code)"
      >
        <th>{{ c.id }}</th>
        <td>{{ c.code }}</td>
        <td>{{ c.name }}</td>
        <td>
          <div class="flex gap-2">
            <NuxtLink :to="`/admin/courses/${c.id}/students`" class="btn btn-primary btn-soft btn-sm">
              Students List
            </NuxtLink>
            <NuxtLink :to="`/admin/courses/${c.id}/enroll`" class="btn btn-secondary btn-soft btn-sm">
              Enrollment
            </NuxtLink>
          </div>
        </td>
      </TableRow>
    </Table>

    <Modal store="course" ref="modal" @deleted="refresh" />
  </Main>
</template>

<style scoped></style>

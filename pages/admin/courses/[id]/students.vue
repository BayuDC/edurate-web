<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'load-course'],
});

const course = useCourseStore();

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Course', href: '/admin/courses' },
  { text: `${course.data.name}`, href: `/admin/courses/${course.id}` },
  { text: 'Students' },
]);

const page = useRouteQuery<number>('page', 1);
const classId = useRouteQuery<number>('class');

const { data, pending } = await useApi<{ students: any[]; meta: any }>(`/courses/${course.id}/students`, {
  key: 'course-students',
  query: { limit: 10, page, classId },
  default: () => ({ students: [], meta: {} }),
});
</script>

<template>
  <Main title="Student List" disable-add-button>
    <template #menu>
      <NuxtLink :to="`/admin/courses/${course.id}/enroll`" class="btn btn-secondary btn-soft"> Enrollment </NuxtLink>
      <SelectClass />
    </template>

    <Table :loading="pending" :columns="['Code', 'Name', 'Class', 'Teacher']">
      <tr v-for="s in data?.students" :key="s.id">
        <TableCell :loading="pending" isTh>{{ s.id }}</TableCell>
        <TableCell :loading="pending">{{ s.code }}</TableCell>
        <TableCell :loading="pending">{{ s.name }}</TableCell>
        <TableCell :loading="pending">{{ s.className }}</TableCell>
        <TableCell :loading="pending">{{ s.teacherName }}</TableCell>

        <td><Loader :loading="pending" /></td>
      </tr>

      <template v-if="!classId" #fallback>Please select a class</template>
      <template v-else #fallback>Please enroll students first</template>
    </Table>
    <div class="mt-4" v-if="classId">
      <Pagination v-bind="resolveMeta(data.meta)" />
    </div>
  </Main>
</template>

<style scoped></style>

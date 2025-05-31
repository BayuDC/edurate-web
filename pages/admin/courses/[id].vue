<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'load-course'],
});

const course = useCourseStore();
const edit = useRouteQuery('edit');

const freeze = ref(true);
const modal = ref<any>(null);

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Manage Courses', href: '/admin/courses' },
  { text: `${course.data.name}` },
]);

async function onSave() {
  if (await course.update()) {
    freeze.value = true;
  }
}

watchImmediate(edit, v => (freeze.value = v !== 'true'));
</script>

<template>
  <Main title="Courses Detail" simple>
    <FormCourse @save="onSave" :freeze="freeze" @delete="modal.select(course.id, course.data.name)" />
    <Modal store="course" ref="modal" @deleted="navigateTo('/admin/courses')" />
  </Main>
</template>

<style scoped></style>

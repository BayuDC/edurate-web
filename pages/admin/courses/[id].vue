<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const course = useCourseStore();
const freeze = ref(true);

course.id = parseInt(route.params.id as string);
await course.load();

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

watchImmediate(
  () => route.query.edit,
  v => (freeze.value = v !== 'true')
);

onUnmounted(() => {
  course.reset();
});

const modal = ref<any>(null);
</script>

<template>
  <Main title="Manage Courses" simple>
    <CourseForm @save="onSave" :freeze="freeze" @delete="modal.select(course.id, course.data.name)" />
    <Modal store="course" ref="modal" @deleted="navigateTo('/admin/courses')" />
  </Main>
</template>

<style scoped></style>

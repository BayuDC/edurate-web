<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Course', href: '/admin/courses' },
  { text: 'New' },

  //
]);

const course = useCourseStore();

async function onSave() {
  if (await course.create()) {
    await navigateTo('/admin/courses');
  }
}

onUnmounted(() => {
  course.reset();
});
</script>

<template>
  <Main title="New Course" simple>
    <FormCourse @save="onSave" />
  </Main>
</template>

<style scoped></style>

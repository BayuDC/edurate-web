<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Teacher', href: '/admin/teachers' },
  { text: 'New' },

  //
]);

const teacher = useTeacherStore();

async function onSave() {
  if (await teacher.create()) {
    await navigateTo('/admin/teachers');
  }
}

onUnmounted(() => {
  teacher.reset();
});
</script>

<template>
  <Main title="New Teacher" simple>
    <FormTeacher @save="onSave" />
  </Main>
</template>

<style scoped></style>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Student', href: '/admin/students' },
  { text: 'New' },

  //
]);

const student = useStudentStore();

async function onSave() {
  if (await student.create()) {
    await navigateTo('/admin/students');
  }
}

onUnmounted(() => {
  student.reset();
});
</script>

<template>
  <Main title="New Student" simple>
    <FormStudent @save="onSave" />
  </Main>
</template>

<style scoped></style>

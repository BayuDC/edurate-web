<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'load-student'],
});

const student = useStudentStore();
const edit = useRouteQuery('edit');

const freeze = ref(true);
const modal = ref<any>(null);

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Student', href: '/admin/students' },
  { text: `${student.data.name}` },
]);

async function onSave() {
  if (await student.update()) {
    freeze.value = true;
  }
}

watchImmediate(edit, v => (freeze.value = v !== 'true'));
</script>

<template>
  <Main title="Student Detail" simple>
    <FormStudent @save="onSave" :freeze="freeze" @delete="modal.select(student.id, student.data.name)" />
    <Modal store="student" ref="modal" @deleted="navigateTo('/admin/students')" />
  </Main>
</template>

<style scoped></style>

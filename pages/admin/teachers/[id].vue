<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'load-teacher'],
});

const teacher = useTeacherStore();
const edit = useRouteQuery('edit');

const freeze = ref(true);
const modal = ref<any>(null);

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Teacher', href: '/admin/teachers' },
  { text: `${teacher.data.name}` },
]);

async function onSave() {
  if (await teacher.update()) {
    freeze.value = true;
  }
}

watchImmediate(edit, v => (freeze.value = v !== 'true'));
</script>

<template>
  <Main title="Teacher Detail" simple>
    <FormTeacher @save="onSave" :freeze="freeze" @delete="modal.select(teacher.id, teacher.data.name)" />
    <Modal store="teacher" ref="modal" @deleted="navigateTo('/admin/teachers')" />
  </Main>
</template>

<style scoped></style>

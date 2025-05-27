<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const $class = useClassStore();

$class.id = parseInt(route.params.id as string);
await $class.load();

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Class', href: '/admin/classes' },
  { text: `${$class.data.name}`, href: `/admin/classes/${$class.id}` },
  { text: 'Students' },
]);

const { data, refresh } = await useApi<{ students: any[] }>(`/classes/${$class.id}/students`, {
  default: () => ({ students: [] }),
});
</script>

<template>
  <Main title="Student List" disable-add-button>
    <Table :columns="['Code', 'Name', 'Gender', 'Birth Info', 'Phone']">
      <tr v-for="s in data.students" :key="s.id">
        <th>{{ s.id }}</th>
        <td>{{ s.code }}</td>
        <td>{{ s.name }}</td>
        <td>{{ s.profile.gender }}</td>
        <td>{{ s.profile.birthPlace }}, {{ s.profile.birthDate }}</td>
        <td>{{ s.profile.phone }}</td>
      </tr>
    </Table>
  </Main>
</template>

<style scoped></style>

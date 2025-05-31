<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'load-class'],
});

const $class = useClassStore();

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Class', href: '/admin/classes' },
  { text: `${$class.data.name}`, href: `/admin/classes/${$class.id}` },
  { text: 'Students' },
]);

const page = useRouteQuery<number>('page', 1);

const { data, pending } = await useApi<{ students: any[]; meta: any }>(`/classes/${$class.id}/students`, {
  key: 'class-students',
  query: { limit: 10, page },
  default: () => ({ students: [], meta: {} }),
});

// const meta = ref({});

// watchImmediate(pending, () => {
//   if (!pending.value) {
//     meta.value = {
//       current: data.value.meta.currentPage,
//       first: data.value.meta.firstPage,
//       last: data.value.meta.lastPage,
//     };
//   }
// });
</script>

<template>
  <Main title="Student List" disable-add-button>
    <Table :columns="['Code', 'Name', 'Gender', 'Birth Info', 'Phone']">
      <tr v-for="s in data?.students" :key="s.id">
        <th :class="{ 'blur-sm': pending }">{{ s.id }}</th>
        <td :class="{ 'blur-sm': pending }">{{ s.code }}</td>
        <td :class="{ 'blur-sm': pending }">{{ s.name }}</td>
        <td :class="{ 'blur-sm': pending }">{{ s.profile.gender }}</td>
        <td :class="{ 'blur-sm': pending }">{{ s.profile.birthPlace }}, {{ s.profile.birthDate }}</td>
        <td :class="{ 'blur-sm': pending }">{{ s.profile.phone }}</td>
        <td>
          <span class="loading loading-spinner text-primary" :class="[!pending ? 'invisible' : 'visible']"></span>
        </td>
      </tr>
    </Table>
    <div class="mt-4">
      <Pagination :current="data.meta.currentPage" :first="data.meta.firstPage" :last="data.meta.lastPage" />
    </div>
  </Main>
</template>

<style scoped></style>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const $class = useClassStore();
const freeze = ref(true);

$class.id = parseInt(route.params.id as string);
await $class.load();

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Manage Classes', href: '/admin/classes' },
  { text: `${$class.data.name}` },
]);

async function onSave() {
  if (await $class.update()) {
    freeze.value = true;
  }
}

watchImmediate(
  () => route.query.edit,
  v => (freeze.value = v !== 'true')
);

onUnmounted(() => {
  $class.reset();
});

const modal = ref<any>(null);
</script>

<template>
  <Main title="Manage Classes" simple>
    <ClassForm @save="onSave" :freeze="freeze" @delete="modal.select($class.id, $class.data.name)" />
    <ClassModal ref="modal" @deleted="navigateTo('/admin/classes')" />
  </Main>
</template>

<style scoped></style>

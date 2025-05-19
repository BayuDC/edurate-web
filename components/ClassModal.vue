<script setup lang="ts">
import type { Dialog } from '#components';

const emit = defineEmits<{
  (e: 'deleted'): void;
}>();

const $class = useClassStore();
const dialog = ref<InstanceType<typeof Dialog> | null>(null);

function onCancel() {}
async function onConfirm() {
  if (await $class.delete()) {
    dialog.value?.close();
    emit('deleted');
  }
}

function select(id: number, name: string) {
  dialog.value?.show(name);
  $class.id = id;
}

defineExpose({
  select,
});
</script>

<template><Dialog ref="dialog" @cancel="onCancel" @confirm="onConfirm" /></template>

<style scoped></style>

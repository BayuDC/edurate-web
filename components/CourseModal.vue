<script setup lang="ts">
import type { Dialog } from '#components';

const emit = defineEmits<{
  (e: 'deleted'): void;
}>();

const course = useCourseStore();
const dialog = ref<InstanceType<typeof Dialog> | null>(null);

function onCancel() {}
async function onConfirm() {
  if (await course.delete()) {
    dialog.value?.close();
    emit('deleted');
  }
}

function select(id: number, code: string) {
  dialog.value?.show(code);
  course.id = id;
}

defineExpose({
  select,
});
</script>

<template><Dialog ref="dialog" @cancel="onCancel" @confirm="onConfirm" /></template>

<style scoped></style>

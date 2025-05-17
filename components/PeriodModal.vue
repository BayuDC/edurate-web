<script setup lang="ts">
import type { Dialog } from '#components';

const emit = defineEmits<{
  (e: 'deleted'): void;
}>();

const period = usePeriodStore();
const dialog = ref<InstanceType<typeof Dialog> | null>(null);

function onCancel() {}
async function onConfirm() {
  if (await period.delete()) {
    dialog.value?.close();
    emit('deleted');
  }
}

function select(id: number, name: string) {
  dialog.value?.show(name);
  period.id = id;
}

defineExpose({
  select,
});
</script>

<template><Dialog ref="dialog" @cancel="onCancel" @confirm="onConfirm" /></template>

<style scoped></style>

<script setup lang="ts">
import type { Dialog } from '#components';

const props = defineProps<{
  store: string;
}>();

const emit = defineEmits<{
  (e: 'deleted'): void;
}>();

const store = getStore(props.store);
const label = ref<string>('');

const dialog = ref<InstanceType<typeof Dialog> | null>(null);

function onCancel() {}
async function onConfirm() {
  if (await store.delete()) {
    dialog.value?.close();
    emit('deleted');
  }
}

function select(id: number, text: string) {
  store.id = id;
  label.value = text;
  dialog.value?.show();
}

defineExpose({
  select,
});
</script>

<template>
  <Dialog ref="dialog" @cancel="onCancel" @confirm="onConfirm">
    <p class="pt-4">
      Are you sure you want to delete <b>{{ label }}</b>
      ?
    </p>
    <p>This action cannot be undone.</p>
  </Dialog>
</template>

<style scoped></style>

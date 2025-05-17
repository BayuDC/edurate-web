<script setup lang="ts">
const self = ref<HTMLDialogElement | null>(null);
const data = ref<string>();

defineExpose({
  show(d: string) {
    data.value = d;
    self.value?.showModal();
  },
  close() {
    self.value?.close();
  },
});

defineEmits<{
  (e: 'cancel'): void;
  (e: 'confirm'): void;
}>();
</script>

<template>
  <dialog class="modal" ref="self">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Confirmation!</h3>
      <p class="pt-4">
        Are you sure you want to delete <b>{{ data }}</b>
        ?
      </p>
      <p>This action cannot be undone.</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-ghost" @click="$emit('cancel')">No</button>
        </form>
        <button class="btn-accent btn" @click="$emit('confirm')">Yes</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>

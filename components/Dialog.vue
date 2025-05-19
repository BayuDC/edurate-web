<script setup lang="ts">
const self = ref<HTMLDialogElement | null>(null);

defineExpose({
  show() {
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

      <slot />

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

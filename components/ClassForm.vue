<script setup lang="ts">
defineProps<{
  freeze?: boolean;
}>();

defineEmits<{
  (e: 'save'): void;
  (e: 'delete'): void;
}>();

const $class = useClassStore();
</script>

<template>
  <Form :freeze="freeze" path="/admin/classes" @save="$emit('save')" @delete="$emit('delete')">
    <Input label="Name" v-model="$class.data.name" :error="$class.error.name" :disabled="freeze" />
  </Form>
</template>

<style scoped></style>

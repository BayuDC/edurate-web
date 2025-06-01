<script setup lang="ts">
defineProps<{
  freeze?: boolean;
}>();

defineEmits<{
  (e: 'save'): void;
  (e: 'delete'): void;
}>();

const student = useStudentStore();
</script>

<template>
  <Form :freeze="freeze" path="/admin/students" @save="$emit('save')" @delete="$emit('delete')">
    <Input label="Code" v-model="student.data.code" :error="student.error.code" :disabled="freeze" />
    <Input label="Name" v-model="student.data.name" :error="student.error.name" :disabled="freeze" />
  </Form>
</template>

<style scoped></style>

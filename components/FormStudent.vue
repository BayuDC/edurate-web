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
    <Select
      label="Gender"
      v-model="student.data.gender"
      :error="student.error.gender"
      :disabled="freeze"
      :options="['Male', 'Female']"
    />
    <Input label="Birth Place" v-model="student.data.birthPlace" :error="student.error.birthPlace" :disabled="freeze" />
    <Input
      label="Birth Date"
      v-model="student.data.birthDate"
      :error="student.error.birthDate"
      type="date"
      :disabled="freeze"
    />
    <Textarea label="Address" v-model="student.data.address" :error="student.error.address" :disabled="freeze" />
    <Input label="Phone" v-model="student.data.phone" :error="student.error.phone" :disabled="freeze" />
  </Form>
</template>

<style scoped></style>

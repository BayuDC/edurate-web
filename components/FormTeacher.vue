<script setup lang="ts">
defineProps<{
  freeze?: boolean;
}>();

defineEmits<{
  (e: 'save'): void;
  (e: 'delete'): void;
}>();

const teacher = useTeacherStore();
</script>

<template>
  <Form :freeze="freeze" path="/admin/teachers" @save="$emit('save')" @delete="$emit('delete')">
    <Input label="Code" v-model="teacher.data.code" :error="teacher.error.code" :disabled="freeze" />
    <Input label="Name" v-model="teacher.data.name" :error="teacher.error.name" :disabled="freeze" />
    <Select
      label="Gender"
      v-model="teacher.data.gender"
      :error="teacher.error.gender"
      :disabled="freeze"
      :options="['Male', 'Female']"
    />
    <Input label="Birth Place" v-model="teacher.data.birthPlace" :error="teacher.error.birthPlace" :disabled="freeze" />
    <Input
      label="Birth Date"
      v-model="teacher.data.birthDate"
      :error="teacher.error.birthDate"
      type="date"
      :disabled="freeze"
    />
    <Textarea label="Address" v-model="teacher.data.address" :error="teacher.error.address" :disabled="freeze" />
    <Input label="Phone" v-model="teacher.data.phone" :error="teacher.error.phone" :disabled="freeze" />
  </Form>
</template>

<style scoped></style>

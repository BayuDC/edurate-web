<script setup lang="ts">
defineProps<{
  freeze?: boolean;
}>();

defineEmits<{
  (e: 'save'): void;
  (e: 'delete'): void;
}>();

const course = useCourseStore();
</script>

<template>
  <Form :freeze="freeze" path="/admin/courses" @save="$emit('save')" @delete="$emit('delete')">
    <Input label="Code" v-model="course.data.code" :error="course.error.code" :disabled="freeze" />
    <Input label="Name" v-model="course.data.name" :error="course.error.name" :disabled="freeze" />
    <Textarea
      label="Description"
      v-model="course.data.description"
      :error="course.error.description"
      :disabled="freeze"
    />

    <fieldset class="fieldset" v-if="freeze">
      <label class="label text-base-content font-bold">Menu</label>
      <div class="flex gap-2">
        <NuxtLink :to="`/admin/courses/${course.id}/students`" class="btn btn-primary btn-soft btn-sm">
          Students List
        </NuxtLink>
        <NuxtLink :to="`/admin/courses/${course.id}/enroll`" class="btn btn-secondary btn-soft btn-sm">
          Enrollment
        </NuxtLink>
      </div>
    </fieldset>
  </Form>
</template>

<style scoped></style>

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

    <fieldset class="fieldset" v-if="freeze">
      <label class="label text-base-content font-bold">Menu</label>
      <div class="flex gap-2">
        <NuxtLink :to="`/admin/classes/${$class.id}/students`" class="btn btn-primary btn-soft btn-sm">
          Students List
        </NuxtLink>
        <NuxtLink :to="`/admin/classes/${$class.id}/enroll`" class="btn btn-secondary btn-soft btn-sm">
          Enrollment
        </NuxtLink>
      </div>
    </fieldset>
  </Form>
</template>

<style scoped></style>

<script setup lang="ts">
defineProps<{
  freeze?: boolean;
}>();

defineEmits<{
  (e: 'save'): void;
  (e: 'delete'): void;
}>();

const period = usePeriodStore();
</script>

<template>
  <Form :freeze="freeze" path="/admin/periods" @save="$emit('save')" @delete="$emit('delete')">
    <Input label="Name" v-model="period.data.name" :error="period.error.name" :disabled="freeze" />
    <div class="flex gap-2 md:gap-4 flex-col md:flex-row">
      <Input
        label="Start Date"
        v-model="period.data.startDate"
        :error="period.error.startDate"
        type="date"
        :disabled="freeze"
      />
      <Input
        label="End Date"
        v-model="period.data.endDate"
        :error="period.error.endDate"
        type="date"
        :disabled="freeze"
      />
    </div>
  </Form>
</template>

<style scoped></style>

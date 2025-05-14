<script setup lang="ts">
import { Icon } from '@iconify/vue';

const emit = defineEmits<{
  (e: 'save'): void;
}>();

const period = usePeriodStore();

function onSubmit() {
  emit('save');
}
</script>

<template>
  <form action="" @submit.prevent="onSubmit">
    <div class="card bg-base-100 shrink-0 rounded-xl">
      <div class="card-body">
        <Input label="Name" v-model="period.data.name" :error="period.error.name" />

        <div class="flex gap-2 md:gap-4 flex-col md:flex-row">
          <Input label="Start Date" v-model="period.data.startDate" :error="period.error.startDate" type="date" />
          <Input label="End Date" v-model="period.data.endDate" :error="period.error.endDate" type="date" />
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <NuxtLink class="btn btn-accent btn-soft mt-4" to="/admin/periods">
        <Icon icon="mingcute:close-fill" class="text-xl" />
        Cancel
      </NuxtLink>
      <button class="btn btn-primary mt-4" type="submit">
        <Icon icon="mingcute:check-fill" class="text-xl" />
        Save
      </button>
    </div>
  </form>
</template>

<style scoped></style>

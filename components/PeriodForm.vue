<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  freeze?: boolean;
}>();

const emit = defineEmits<{
  (e: 'save'): void;
  (e: 'delete'): void;
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
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <NuxtLink class="btn btn-base mt-4 mr-auto" to="/admin/periods">
        <Icon icon="mingcute:large-arrow-left-fill" class="text-xl" />
        Back
      </NuxtLink>
      <template v-if="freeze">
        <NuxtLink class="btn btn-secondary mt-4" to="?edit=true">
          <Icon icon="mingcute:edit-2-fill" class="text-xl" />
          Edit
        </NuxtLink>
        <button class="btn btn-accent mt-4" type="button" @click="$emit('delete')">
          <Icon icon="mingcute:delete-2-fill" class="text-xl" />
          Delete
        </button>
      </template>
      <template v-else>
        <NuxtLink class="btn btn-accent btn-soft mt-4" to="?">
          <Icon icon="mingcute:close-fill" class="text-xl" />
          Cancel
        </NuxtLink>
        <button class="btn btn-primary mt-4" type="submit">
          <Icon icon="mingcute:check-fill" class="text-xl" />
          Save
        </button>
      </template>
    </div>
  </form>
</template>

<style scoped></style>

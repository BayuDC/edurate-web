<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  path: string;
  freeze?: boolean;
}>();
defineEmits<{
  (e: 'save'): void;
  (e: 'delete'): void;
}>();

const route = useRoute();
</script>

<template>
  <form action="" @submit.prevent="$emit('save')">
    <div class="card bg-base-100 shrink-0 rounded-xl">
      <div class="card-body">
        <slot />
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <NuxtLink class="btn btn-base mt-4 mr-auto" :to="`${path}`">
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
        <NuxtLink v-if="route.path != `${path}/new`" class="btn btn-accent btn-soft mt-4" to="?">
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

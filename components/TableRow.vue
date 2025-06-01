<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  path: string;
  delete: () => void;
  loading?: boolean;
}>();
</script>

<template>
  <tr class="hover:bg-base-300">
    <slot />

    <td class="flex gap-2 items-center" :class="{ 'blur-sm': loading }">
      <NuxtLink :to="`${props.path}`" class="btn btn-primary btn-sm">
        <div class="flex items-center gap-1">
          <Icon icon="mingcute:information-fill" class="text-lg" />
        </div>
      </NuxtLink>
      <NuxtLink :to="`${props.path}?edit=true`" class="btn btn-secondary btn-sm">
        <div class="flex items-center gap-1">
          <Icon icon="mingcute:edit-2-fill" class="text-lg" />
        </div>
      </NuxtLink>
      <button class="btn btn-accent btn-sm" @click="() => props.delete()">
        <div class="flex items-center gap-1">
          <Icon icon="mingcute:delete-2-fill" class="text-lg" />
        </div>
      </button>
    </td>

    <td><Loader :loading="loading" /></td>
  </tr>
</template>

<style scoped></style>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  current: number;
  first: number;
  last: number;
}>();

const page = useRouteQuery<number>('page');
</script>

<template>
  <div class="join">
    <button @click="page = first" class="join-item btn text-lg">
      <Icon icon="mingcute:arrows-left-fill" />
    </button>
    <button v-if="current - 2 >= first" @click="page = current - 2" class="join-item btn">
      {{ current - 2 }}
    </button>
    <button v-if="current - 1 >= first" @click="page = current - 1" class="join-item btn">
      {{ current - 1 }}
    </button>
    <button class="join-item btn btn-active btn-primary">{{ current }}</button>
    <button v-if="current + 1 <= last" @click="page = current + 1" class="join-item btn">
      {{ current + 1 }}
    </button>
    <button v-if="current + 2 <= last" @click="page = current + 2" class="join-item btn">
      {{ current + 2 }}
    </button>
    <button @click="page = last" class="join-item btn text-lg">
      <Icon icon="mingcute:arrows-right-fill" />
    </button>
  </div>
</template>

<style scoped></style>

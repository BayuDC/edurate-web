<script setup lang="ts">
import { Icon } from '@iconify/vue';

const route = useRoute();
const props = defineProps<{
  title: string;
  simple?: boolean;
  disableAddButton?: boolean;
}>();
</script>

<template>
  <main :class="{ 'w-full max-w-xl': simple }">
    <div class="flex flex-col md:flex-row gap-4 justify-between mb-4">
      <h1 class="text-4xl font-bold text-white">{{ title }}</h1>
      <div v-if="!simple" class="flex md:flex-row flex-col gap-4">
        <slot name="menu"></slot>

        <div class="flex gap-4 w-full">
          <div class="join w-full">
            <input class="input join-item" placeholder="Type here.." />
            <button class="btn join-item btn-secondary font-bold">
              <div class="flex items-center gap-2">
                <Icon icon="mingcute:search-2-fill" class="text-xl" />
              </div>
            </button>
          </div>
          <NuxtLink v-if="!disableAddButton" :to="route.path + '/new'" class="btn join-item btn-primary font-bold">
            <div class="flex items-center gap-2">
              <Icon icon="mingcute:add-fill" class="text-xl" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <slot />
  </main>
</template>

<style scoped></style>

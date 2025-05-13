<script setup lang="ts">
import { Icon } from '@iconify/vue';

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
});

const { data } = await useApi<{ periods: any[] }>('/periods', {
  default: () => ({ periods: [] }),
});
</script>

<template>
  <main class="">
    <div>
      <div class="flex flex-col md:flex-row gap-4 justify-between">
        <h1 class="text-4xl font-bold text-white">Academic Periods</h1>
        <div class="flex gap-4">
          <div class="join mb-4 w-full">
            <input class="input join-item" placeholder="" />
            <button class="btn join-item btn-secondary font-bold">
              <div class="flex items-center gap-2">
                <Icon icon="mingcute:search-2-fill" class="text-xl" />
              </div>
            </button>
          </div>
          <button class="btn join-item btn-primary font-bold">
            <div class="flex items-center gap-2">
              <Icon icon="mingcute:add-fill" class="text-xl" />
            </div>
          </button>
        </div>
      </div>

      <!-- <button class="btn btn-primary mb-4">
        <div class="flex items-center gap-2">
          <Icon icon="mingcute:add-fill" class="text-2xl" />
          <span>New Period</span>
        </div>
      </button> -->

      <div class="overflow-x-auto text-white bg-base-100 rounded-xl shadow-lg">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Data</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in data.periods" class="hover:bg-base-300">
              <th>{{ p.id }}</th>
              <td>{{ p.name }}</td>
              <td>{{ p.startDate }}</td>
              <td>{{ p.endDate }}</td>
              <td><input type="checkbox" :checked="false" class="toggle toggle-primary" /></td>
              <td class="flex gap-2">
                <button class="btn btn-secondary btn-sm">
                  <div class="flex items-center gap-1">
                    <Icon icon="mingcute:edit-2-fill" class="text-lg" />
                  </div>
                </button>
                <button class="btn btn-accent btn-sm">
                  <div class="flex items-center gap-1">
                    <Icon icon="mingcute:delete-2-fill" class="text-lg" />
                  </div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

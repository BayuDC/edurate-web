<script setup lang="ts">
import type { Dialog } from '#components';
import { Icon } from '@iconify/vue';

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Academic Periods' },
  //
]);

const { data, refresh } = await useApi<{ periods: any[] }>('/periods', {
  default: () => ({ periods: [] }),
});

const dialog = ref<InstanceType<typeof Dialog> | null>(null);
const period = usePeriodStore();

function showDialog(id: number, name: string) {
  dialog.value?.show(name);
  period.id = id;
}
function onCancel() {
  period.reset();
}
async function onConfirm() {
  if (await period.delete()) {
    dialog.value?.close();
    period.reset();
    await refresh();
  }
}
</script>

<template>
  <main class="">
    <div class="flex flex-col md:flex-row gap-4 justify-between mb-4">
      <h1 class="text-4xl font-bold text-white">Academic Periods</h1>
      <div class="flex gap-4">
        <div class="join w-full">
          <input class="input join-item" placeholder="" />
          <button class="btn join-item btn-secondary font-bold">
            <div class="flex items-center gap-2">
              <Icon icon="mingcute:search-2-fill" class="text-xl" />
            </div>
          </button>
        </div>
        <NuxtLink to="/admin/periods/new" class="btn join-item btn-primary font-bold">
          <div class="flex items-center gap-2">
            <Icon icon="mingcute:add-fill" class="text-xl" />
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="overflow-x-auto h-full text-white bg-base-100 rounded-xl shadow-lg">
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
              <NuxtLink :to="`/admin/periods/${p.id}`" class="btn btn-secondary btn-sm">
                <div class="flex items-center gap-1">
                  <Icon icon="mingcute:edit-2-fill" class="text-lg" />
                </div>
              </NuxtLink>
              <button class="btn btn-accent btn-sm" @click="showDialog(p.id, p.name)">
                <div class="flex items-center gap-1">
                  <Icon icon="mingcute:delete-2-fill" class="text-lg" />
                </div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Dialog ref="dialog" @cancel="onCancel" @confirm="onConfirm" />
  </main>
</template>

<style scoped></style>

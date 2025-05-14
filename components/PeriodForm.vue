<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <form action="">
    <div class="card bg-base-100 shrink-0 rounded-xl">
      <div class="card-body">
        <fieldset class="fieldset">
          <label class="label">Name</label>
          <input type="text" class="input w-full" />
        </fieldset>
        <div class="flex gap-2 md:gap-4 flex-col md:flex-row">
          <fieldset class="fieldset w-full">
            <label class="label">Start Date</label>
            <input type="date" class="input w-full" />
          </fieldset>
          <fieldset class="fieldset w-full">
            <label class="label">End Date</label>
            <input type="date" class="input w-full" />
          </fieldset>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <button class="btn btn-accent btn-soft mt-4">
        <Icon icon="mingcute:close-fill" class="text-xl" />
        Cancel
      </button>
      <button class="btn btn-primary mt-4">
        <Icon icon="mingcute:check-fill" class="text-xl" />
        Save
      </button>
    </div>
  </form>
</template>

<style scoped></style>

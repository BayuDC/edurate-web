<script setup lang="ts">
defineProps<{
  columns: string[];
  loading?: boolean;
}>();
</script>

<template>
  <div class="overflow-x-auto h-full text-white bg-base-100 rounded-xl shadow-lg">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th v-for="c in columns">{{ c }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <slot>
          <tr>
            <td colspan="100%" class="text-center">
              <div class="h-10 flex items-center justify-center">
                <span v-if="!loading"> No data available </span>
                <Loader v-else :loading="true" />
              </div>
            </td>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>

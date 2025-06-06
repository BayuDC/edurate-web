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
              <div class="pt-8 py-10 flex-row items-center justify-center">
                <template v-if="!loading">
                  <div>No data available</div>
                  <div><slot name="fallback" /></div>
                </template>
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

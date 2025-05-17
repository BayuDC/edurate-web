<script setup lang="ts">
defineProps<{
  columns: string[];
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
        <slot />
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>

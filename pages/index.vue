<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
const auth = useAuthStore();
</script>

<template>
  <div class="hero bg-neutral min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md flex flex-col items-center justify-center gap-10">
        <h1 class="text-5xl font-bold">Hello {{ auth.user?.username || 'there' }}</h1>

        <Animate name="bounce" infinite>
          <a href="/login" class="btn btn-primary">Get Started</a>
        </Animate>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

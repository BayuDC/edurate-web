<script setup lang="ts">
definePageMeta({
  layout: 'empty',
});

const auth = useAuthStore();

onMounted(async () => {
  await auth.logout();
  navigateTo('/login');
});
</script>

<template>
  <div class="hero bg-base-300 min-h-screen">
    <div class="hero-content flex flex-col max-w-[30rem] w-full">
      <div class="mb-6">
        <h1 class="text-4xl font-bold">Logout from Edurate!</h1>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

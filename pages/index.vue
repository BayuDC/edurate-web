<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
const auth = useAuthStore();
</script>

<template>
  <div>
    <div>
      <div class="flex flex-col gap-4 max-w-xs">
        <h1 class="text-5xl font-bold">Hello {{ auth.user?.username || 'there' }}</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque optio eum nobis sequi laboriosam nostrum
          dignissimos quam distinctio? Debitis quia iusto unde officia laboriosam voluptas amet dignissimos ducimus
          accusantium repellendus?
        </p>
        <Animate name="bounce" infinite>
          <a href="/login" class="btn btn-primary">Get Started</a>
        </Animate>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

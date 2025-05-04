<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <Html>
    <Head>
      <Title>Edurate</Title>
    </Head>
    <Body data-theme="night" class="overflow-hidden">
      <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-8xl font-bold">{{ error.statusCode }}</h1>
            <p class="py-6 text-2xl">{{ error.statusMessage }}</p>
            <NuxtLink to="/" class="btn btn-accent">Go back home</NuxtLink>
          </div>
        </div>
      </div>
    </Body>
  </Html>
</template>

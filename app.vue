<script setup lang="ts">
import 'animate.css';

const route = useRoute();

useNuxtApp().hook('page:finish', () => {
  if (!/^\/admin\/classes\/\d+(?:\/.*)?$/.test(route.path)) {
    useClassStore().reset();
  }
});
</script>

<template>
  <Html>
    <Head>
      <Title>Edurate</Title>
    </Head>
    <Body data-theme="night" class="max-h-screen">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

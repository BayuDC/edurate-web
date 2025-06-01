<script setup lang="ts">
import 'animate.css';

const route = useRoute();

// garbage collection for unused stores
useNuxtApp().hook('page:finish', () => {
  // for /admin/classes/** */
  if (!/^\/admin\/classes\/\d+(?:\/.*)?$/.test(route.path)) {
    useClassStore().reset();
  }
  // for /admin/courses/** */
  if (!/^\/admin\/courses\/\d+(?:\/.*)?$/.test(route.path)) {
    useCourseStore().reset();
  }
  // for /admin/periods/** */
  if (!/^\/admin\/periods\/\d+(?:\/.*)?$/.test(route.path)) {
    usePeriodStore().reset();
  }
  // for /admin/students/** */
  if (!/^\/admin\/students\/\d+(?:\/.*)?$/.test(route.path)) {
    useStudentStore().reset();
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

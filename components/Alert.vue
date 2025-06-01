<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  left?: boolean;
}>();

const alert = useAlertStore();

onUnmounted(() => {
  alert.reset();
});
</script>

<template>
  <div>
    <template v-for="m in alert.messages">
      <div
        v-if="m.render"
        :class="[left ? 'md:translate-x-0 md:left-4 left-[50%] translate-x-[-50%]' : 'left-[50%] translate-x-[-50%]']"
        class="md:max-w-[30rem] w-full absolute bottom-8 px-4 mx-auto flex flex-col gap-4"
      >
        <Animate :name="m.active ? 'fadeInUp' : 'fadeOut'" :duration="300" class="">
          <div
            role="alert"
            class="alert alert-soft gap-2"
            :class="{
              'alert-error': m.type == 'error',
              'alert-success': m.type == 'success',
            }"
          >
            <Icon v-if="m.type == 'error'" icon="mingcute:close-circle-fill" class="text-2xl" />
            <Icon v-else-if="m.type == 'success'" icon="mingcute:check-circle-fill" class="text-2xl" />
            <Icon v-else icon="mingcute:warning-fill" class="text-2xl" />

            <span>{{ m.message }}</span>
          </div>
        </Animate>
      </div>
    </template>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
const alert = useAlertStore();

function onAnimationEnd() {
  if (alert.animation == 'backInUp') return;

  alert.message = '';
  alert.render = false;
}
</script>

<template>
  <div>
    <div v-if="alert.render" class="max-w-[30rem] w-full absolute bottom-6 left-[50%] translate-x-[-50%] px-4 mx-auto">
      <Animate :name="alert.animation" @animationend="onAnimationEnd">
        <div role="alert" class="alert alert-error alert-soft">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ alert.message }}</span>
        </div>
      </Animate>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
});

const auth = useAuthStore();
const alert = useAlertStore();

const username = ref('');
const password = ref('');

async function onSubmit() {
  if (auth.loading) return;

  if (await auth.login(username.value, password.value)) {
    alert.show('Login successful!', 'success');
    navigateTo('/');

    return;
  }

  alert.show('Login failed. Please check your username and password!');
}
</script>

<template>
  <div class="hero bg-base-300 min-h-screen">
    <div class="hero-content flex flex-col max-w-[30rem] w-full">
      <div class="mb-6">
        <h1 class="text-4xl font-bold">Login to Edurate!</h1>
      </div>
      <div class="card bg-base-100 w-full shrink-0 shadow-2xl">
        <form class="card-body" @submit.prevent="onSubmit">
          <fieldset class="fieldset">
            <label class="label">Username</label>
            <input v-model="username" type="text" class="input w-full" placeholder="Enter username.." />
          </fieldset>
          <fieldset class="fieldset">
            <label class="label">Password</label>
            <input v-model="password" type="password" class="input w-full" placeholder="Enter password.." />
          </fieldset>
          <div><a class="link link-hover">Forgot password?</a></div>
          <button class="btn btn-primary mt-4" :class="{ 'btn-soft': auth.loading }" type="submit">
            <span v-if="auth.loading" class="loading loading-dots"></span>
            <span v-else>Login</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

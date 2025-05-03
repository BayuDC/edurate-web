<script setup lang="ts">
function onSubmit() {
  navigateTo('/');
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
            <input type="text" class="input w-full" placeholder="Enter username.." />
          </fieldset>
          <fieldset class="fieldset">
            <label class="label">Password</label>
            <input type="password" class="input w-full" placeholder="Enter password.." />
          </fieldset>
          <div><a class="link link-hover">Forgot password?</a></div>
          <button class="btn btn-primary mt-4" type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

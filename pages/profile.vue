<script setup lang="ts">
import { Icon } from '@iconify/vue';

definePageMeta({
  middleware: ['auth'],
});

setBreadcrumb([
  { text: 'Home', href: '/' },
  { text: 'Profile', href: '/profile' },
]);

const auth = useAuthStore();
const { data } = await useApi<{ user: any; profile: any }>('/profile', {
  default() {
    return { user: {}, profile: {} };
  },
});

const body = ref({
  password: '',
  passwordConfirm: '',
  passwordCurrent: '',
});

async function onSave() {
  try {
    await $fetch('/profile', {
      ...useFetchOption(),
      method: 'PUT',
      body: toValue(body),
    });
  } catch (error) {
    // Handle error
    console.error('Error saving profile:', error);
  }
}
</script>

<template>
  <Main title="My Profile" disable-add-button disable-search>
    <div class="flex flex-wrap gap-4">
      <form class="max-w-xl w-full">
        <div class="card bg-base-100 shrink-0 rounded-xl">
          <div class="card-body">
            <div class="flex flex-row gap-4">
              <Input label="Username" :model-value="auth.user!.username" :disabled="true" />
              <Input label="Code" :model-value="data.user?.code" :disabled="true" />
            </div>
            <Input label="Name" :model-value="data.user?.name" disabled />
            <div class="flex md:flex-row flex-col gap-4">
              <Input label="Birth Place" :model-value="data.profile?.birthPlace" disabled />
              <Input label="Birth Date" :model-value="data.profile?.birthDate" disabled />
            </div>
            <Textarea label="Address" :model-value="data.profile?.address" disabled />
            <div class="flex md:flex-row flex-col gap-4">
              <Input label="Phone" :model-value="data.profile?.phone" disabled />
              <Input label="Gender" :model-value="data.profile?.gender" disabled />
            </div>
          </div>
        </div>
      </form>
      <form class="max-w-xl w-full" action="" @submit.prevent="onSave">
        <div class="card bg-base-100 shrink-0 rounded-xl">
          <div class="card-body">
            <div class="flex md:flex-row flex-col gap-4">
              <Input label="Email" :model-value="auth.user?.email" disabled />
              <Input label="Current Password" type="password" v-model="body.passwordCurrent" />
            </div>
            <div class="flex md:flex-row flex-col gap-4">
              <Input label="New Password" type="password" v-model="body.password" />
              <Input label="Password Confirmation" type="password" v-model="body.passwordConfirm" />
            </div>
          </div>
        </div>
        <button class="btn btn-primary mt-4 items-center flex" type="submit">
          <Icon icon="mingcute:save-2-fill" class="text-xl" />
          <div>Update Password</div>
        </button>
      </form>
    </div>
  </Main>
</template>

<style scoped></style>

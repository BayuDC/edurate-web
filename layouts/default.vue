<script setup lang="ts">
const auth = useAuthStore();

const menus = computed(() => {
  switch (auth.user?.role) {
    case 'admin':
      return [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Manage User', path: '/admin/users' },
        { name: 'Manage Class', path: '/admin/classes' },
        { name: 'Manage Course', path: '/admin/courses' },
        { name: 'Academic Periods', path: '/admin/periods' },
        { name: 'Activity Log', path: '/admin/log' },
        { name: 'Profile', path: '/admin/profile' },
      ];
    case 'teacher':
      return [
        { name: 'Dashboard', path: '/lecturer/dashboard' },
        { name: 'My Classes', path: '/lectures/my-classes' },
        { name: 'Survey Result', path: '/lectures/survey-result' },
        { name: 'Profile', path: '/lecturer/profile' },
      ];
    case 'student':
      return [
        { name: 'My Surveys', path: '/student/my-surveys' },
        { name: 'History', path: '/student/history' },
        { name: 'Profile', path: '/student/profile' },
      ];
    default:
      return [];
  }
});
</script>

<template>
  <div>
    <div class="navbar bg-base-200 shadow-sm px-7 border-primary border-b-2">
      <div class="flex-1">
        <div class="text-xl font-bold text-primary">Edurate!</div>
      </div>
      <div class="flex-none">
        <label for="my-drawer-2" class="btn btn-square btn-primary drawer-button lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
    </div>
    <div>
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center">
          <!-- Page content here -->

          <slot />
        </div>
        <div class="drawer-side">
          <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
          <ul class="menu bg-base-200 text-base-content min-h-full w-60 p-4">
            <!-- Sidebar content here -->
            <li v-for="menu in menus" class="text-base font-semibold mb-2" :key="menu.path">
              <NuxtLink :to="menu.path">{{ menu.name }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

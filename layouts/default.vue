<script setup lang="ts">
import { Icon } from '@iconify/vue';

const auth = useAuthStore();

const menus = computed(() => {
  switch (auth.user?.role) {
    case 'admin':
      return [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'mingcute:chart-bar-fill' },
        { name: 'Manage User', path: '/admin/users', icon: 'mingcute:group-fill' },
        { name: 'Manage Class', path: '/admin/classes', icon: 'mingcute:hexagons-fill' },
        { name: 'Manage Course', path: '/admin/courses', icon: 'mingcute:book-2-fill' },
        { name: 'Academic Periods', path: '/admin/periods', icon: 'mingcute:calendar-month-fill' },
        { name: 'Activity Log', path: '/admin/log', icon: 'mingcute:to-do-fill' },
      ];
    case 'teacher':
      return [
        { name: 'Dashboard', path: '/lecturer/dashboard', icon: 'mingcute:chart-bar-fill' },
        { name: 'My Classes', path: '/lectures/my-classes', icon: 'mingcute:box-3-fill' },
        { name: 'Survey Result', path: '/lectures/survey-result', icon: 'mingcute:celebrate-fill' },
      ];
    case 'student':
      return [
        { name: 'My Surveys', path: '/student/my-surveys', icon: 'mingcute:cursor-3-fill' },
        { name: 'History', path: '/student/history', icon: 'mingcute:history-anticlockwise-fill' },
      ];
    default:
      return [];
  }
});
</script>

<template>
  <div>
    <div class="navbar bg-base-300 shadow-sm px-7 border-primary border-b-4 fixed top-0 z-50">
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
    <div class="">
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col bg-neutral relative h-screen">
          <!-- Page content here -->

          <div class="overflow-y-auto h-full p-6 md:p-8 pt-24 md:pt-24">
            <slot />
          </div>
          <Alert left />
        </div>
        <div class="drawer-side pt-16">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <ul class="menu bg-base-300 text-base-content min-h-full w-60 p-4">
            <!-- Sidebar content here -->
            <li
              v-for="menu in menus"
              class="text-base font-semibold mb-3 text-base-content hover:text-primary"
              :key="menu.path"
            >
              <div>
                <Icon :icon="menu.icon" class="text-2xl" />
                <NuxtLink :to="menu.path">{{ menu.name }}</NuxtLink>
              </div>
            </li>
            <li class="text-base font-semibold mb-3 text-base-content hover:text-primary">
              <div>
                <Icon icon="mingcute:user-3-fill" class="text-2xl" />
                <NuxtLink to="/profile">Profile</NuxtLink>
              </div>
            </li>
            <li class="text-base font-semibold mb-3 hover:text-accent">
              <div>
                <Icon icon="mingcute:exit-door-fill" class="text-2xl" />
                <NuxtLink to="/logout">Logout</NuxtLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

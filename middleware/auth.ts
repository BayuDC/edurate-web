export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  await auth.sync();
});

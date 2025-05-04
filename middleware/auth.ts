export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  // throw createError({
  //   statusCode: 401,
  //   statusMessage: 'Unauthorized',
  // });

  if (!(await auth.sync())) {
    return navigateTo('/login');
  }
});

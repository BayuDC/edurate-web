export default defineNuxtRouteMiddleware((to, from) => {
  if (!useGate('teacher')) {
    return abortNavigation({
      statusCode: 403,
      statusMessage: 'Forbidden',
    });
  }
});

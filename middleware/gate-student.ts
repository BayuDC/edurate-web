export default defineNuxtRouteMiddleware((to, from) => {
  if (!useGate('student')) {
    return abortNavigation({
      statusCode: 403,
      statusMessage: 'Forbidden',
    });
  }
});

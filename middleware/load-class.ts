export default defineNuxtRouteMiddleware(async (to, from) => {
  const id = parseInt(to.params.id as string);
  await useClassStore().load(id);
});

export default defineNuxtRouteMiddleware(async (to, from) => {
  const period = usePeriodStore();

  if (period.id && to.path == from.path) return;

  const id = parseInt(to.params.id as string);
  await period.load(id);
});

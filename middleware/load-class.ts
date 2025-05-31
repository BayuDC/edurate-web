export default defineNuxtRouteMiddleware(async (to, from) => {
  const cls = useClassStore();

  if (cls.id && to.path == from.path) return;

  const id = parseInt(to.params.id as string);
  await cls.load(id);
});

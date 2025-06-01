export default defineNuxtRouteMiddleware(async (to, from) => {
  const teacher = useTeacherStore();

  if (teacher.id && to.path == from.path) return;

  const id = parseInt(to.params.id as string);
  await teacher.load(id);
});

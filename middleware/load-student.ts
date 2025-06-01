export default defineNuxtRouteMiddleware(async (to, from) => {
  const student = useStudentStore();

  if (student.id && to.path == from.path) return;

  const id = parseInt(to.params.id as string);
  await student.load(id);
});

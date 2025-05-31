export default defineNuxtRouteMiddleware(async (to, from) => {
  const course = useCourseStore();

  if (course.id && to.path == from.path) return;

  const id = parseInt(to.params.id as string);
  await course.load(id);
});

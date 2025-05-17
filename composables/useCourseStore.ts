export const useCourseStore = defineStore('course', () => {
  const id = ref(0);

  const data = ref({
    code: '',
    name: '',
    description: '',
  });
  const error = ref({
    code: '',
    name: '',
    description: '',
  });

  async function load(): Promise<void> {
    if (!id.value) return;

    const result = await useApi<{ course: any }>(`/courses/${id.value}`, {});

    if (result.data.value) {
      data.value.code = result.data.value.course.code;
      data.value.name = result.data.value.course.name;
      data.value.description = result.data.value.course.description;
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/courses', toValue(data));

    if (err) {
      error.value.code = err.code;
      error.value.name = err.name;
      error.value.description = err.description;
      return false;
    }

    error.value.code = error.value.name = error.value.description = '';
    return true;
  }

  async function update(): Promise<boolean> {
    const err = await useApiUpdate(`/courses/${id.value}`, toValue(data));

    if (err) {
      error.value.code = err.code;
      error.value.name = err.name;
      error.value.description = err.description;
      return false;
    }

    error.value.code = error.value.name = error.value.description = '';
    return true;
  }

  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/courses/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.code = '';
    data.value.name = '';
    data.value.description = '';
    error.value.code = '';
    error.value.name = '';
    error.value.description = '';
  }

  return { id, data, error, load, create, update, delete: destroy, reset };
});

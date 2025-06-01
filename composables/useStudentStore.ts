export const useStudentStore = defineStore('student', () => {
  const id = ref(0);

  const data = ref({
    code: '',
    name: '',
  });
  const error = ref({
    code: '',
    name: '',
  });

  async function load(_id?: number): Promise<void> {
    if (_id) id.value = _id;
    else if (!id.value) return;

    const result = await useApi<{ student: any }>(`/students/${id.value}`, {});

    if (result.data.value) {
      data.value.code = result.data.value.student.code;
      data.value.name = result.data.value.student.name;
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/students', toValue(data));

    if (err) {
      error.value.code = err.code;
      error.value.name = err.name;
      return false;
    }

    error.value.code = error.value.name = '';
    return true;
  }

  async function update(): Promise<boolean> {
    const err = await useApiUpdate(`/students/${id.value}`, toValue(data));

    if (err) {
      error.value.code = err.code;
      error.value.name = err.name;
      return false;
    }

    error.value.code = error.value.name = '';
    return true;
  }

  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/students/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.code = '';
    data.value.name = '';
    error.value.code = '';
    error.value.name = '';
  }

  return { id, data, error, load, create, update, delete: destroy, reset };
});

export const useClassStore = defineStore('class', () => {
  const id = ref(0);

  const data = ref({
    name: '',
  });
  const error = ref({
    name: '',
  });

  async function load(): Promise<void> {
    if (!id.value) return;

    const result = await useApi<{ class: any }>(`/classes/${id.value}`, {});

    if (result.data.value) {
      data.value.name = result.data.value.class.name;
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/classes', toValue(data));

    if (err) {
      error.value.name = err.name;
      return false;
    }

    error.value.name = '';
    return true;
  }

  async function update(): Promise<boolean> {
    const err = await useApiUpdate(`/classes/${id.value}`, toValue(data));

    if (err) {
      error.value.name = err.name;
      return false;
    }

    error.value.name = '';
    return true;
  }

  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/classes/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.name = '';
    error.value.name = '';
  }

  return { id, data, error, load, create, update, delete: destroy, reset };
});

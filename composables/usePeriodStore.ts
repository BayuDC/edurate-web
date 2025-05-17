export const usePeriodStore = defineStore('period', () => {
  const id = ref(0);

  const data = ref({
    name: '',
    startDate: '',
    endDate: '',
  });
  const error = ref({
    name: '',
    startDate: '',
    endDate: '',
  });

  async function load(): Promise<void> {
    if (!id.value) return;

    const result = await useApi<{ period: any }>(() => `/periods/${id.value}`, {});

    if (result.data.value) {
      data.value.name = result.data.value.period.name;
      data.value.startDate = result.data.value.period.startDate;
      data.value.endDate = result.data.value.period.endDate;
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/periods', toValue(data));

    if (err) {
      error.value.name = err.name;
      error.value.startDate = err.startDate;
      error.value.endDate = err.endDate;
      return false;
    }

    error.value.name = error.value.startDate = error.value.endDate = '';
    return true;
  }

  async function update(): Promise<boolean> {
    const err = await useApiUpdate(`/periods/${id.value}`, toValue(data));

    if (err) {
      error.value.name = err.name;
      error.value.startDate = err.startDate;
      error.value.endDate = err.endDate;
      return false;
    }

    error.value.name = error.value.startDate = error.value.endDate = '';
    return true;
  }

  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/periods/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.name = '';
    data.value.startDate = '';
    data.value.endDate = '';
    error.value.name = '';
    error.value.startDate = '';
    error.value.endDate = '';
  }

  return { id, data, error, load, create, update, delete: destroy, reset };
});

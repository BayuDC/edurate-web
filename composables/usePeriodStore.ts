export const usePeriodStore = defineStore('period', () => {
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

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/periods', toValue(data));

    if (err) {
      error.value.name = err.name;
      error.value.startDate = err.startDate;
      error.value.endDate = err.endDate;
      return false;
    }

    return true;
  }

  function reset() {
    data.value.name = '';
    data.value.startDate = '';
    data.value.endDate = '';
    error.value.name = '';
    error.value.startDate = '';
    error.value.endDate = '';
  }

  return { data, error, create, reset };
});

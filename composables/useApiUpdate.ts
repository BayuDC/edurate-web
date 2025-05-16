const useApiUpdate = async (path: string, body: Record<string, any>): Promise<Record<string, string> | null> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token');

  const alert = useAlertStore();

  try {
    const data = await $fetch(path, {
      baseURL: config.public.apiUrl,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body,
    });

    nextTick(() => {
      alert.show('Successfully updated data', 'success');
    });

    return null;
  } catch (error: any) {
    alert.show('Failed to update data', 'error');

    if (error.data.errors.length) {
      return (error.data.errors as any[]).reduce((acc, e) => {
        acc[e.field] = e.message;

        return acc;
      }, {});
    }

    return error.data;
  }
};

export default useApiUpdate;

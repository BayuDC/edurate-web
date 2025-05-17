const useApiDelete = async (path: string): Promise<Record<string, string> | null> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token');

  const alert = useAlertStore();
  try {
    const data = await $fetch(path, {
      baseURL: config.public.apiUrl,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    nextTick(() => {
      alert.show('Successfully deleted data', 'success');
    });

    return null;
  } catch (error: any) {
    alert.show('Failed to delete data', 'error');

    return error.data;
  }
};

export default useApiDelete;

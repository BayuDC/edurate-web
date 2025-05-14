import { useFetch } from '#app';

const useApiCreate = async (path: string, body: Record<string, any>): Promise<Record<string, string> | null> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token');

  try {
    const data = await $fetch(path, {
      baseURL: config.public.apiUrl,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body,
    });

    return null;
  } catch (error: any) {
    if (error.data.errors.length) {
      return (error.data.errors as any[]).reduce((acc, e) => {
        acc[e.field] = e.message;

        return acc;
      }, {});
    }

    return error.data;
  }
};

export default useApiCreate;

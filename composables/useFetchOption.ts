export default function useFetchOption() {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token');
  return {
    baseURL: config.public.apiUrl,
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
}

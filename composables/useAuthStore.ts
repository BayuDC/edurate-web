interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}

export default function useAuthStore() {
  const user = ref<User | null>(null);
  const loading = ref(false);

  function sync() {}
  async function login(username: string, password: string) {
    try {
      loading.value = true;
      const data = await $fetch<{ token: string }>('/auth/login', {
        baseURL: 'https://handsome-traci-bayudc-6b35ca09.koyeb.app',
        body: { username, password },
        method: 'post',
      });
      localStorage.setItem('token', data!.token);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      loading.value = false;
    }
  }
  function logout() {}

  return { user, sync, login, logout, loading };
}

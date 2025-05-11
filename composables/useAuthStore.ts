interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);

  async function sync() {
    const token = localStorage.getItem('token');
    if (!token) {
      user.value = null;
      return false;
    }
    try {
      loading.value = true;
      const data = await $fetch<User>('/auth/me', {
        baseURL: 'https://handsome-traci-bayudc-6b35ca09.koyeb.app',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      user.value = data;
      return true;
    } catch (error) {
      user.value = null;
      return false;
    } finally {
      loading.value = false;
    }
  }

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
  function logout() {
    localStorage.removeItem('token');
    user.value = null;
  }

  return { user, sync, login, logout, loading };
});

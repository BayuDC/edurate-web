export const useAlertStore = defineStore('alert', () => {
  const message = ref('');
  const render = ref(false);
  const animation = ref<'backInUp' | 'backOutDown' | string>('');

  function show(msg: string) {
    message.value = msg;
    render.value = true;
    animation.value = 'backInUp';
  }
  function hide() {
    animation.value = 'backOutDown';
  }

  return { message, render, animation, show, hide };
});

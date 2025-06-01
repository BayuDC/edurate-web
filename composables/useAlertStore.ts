export const useAlertStore = defineStore('alert', () => {
  const messages = reactive<
    {
      message: string;
      type: 'success' | 'error';
      active: boolean;
      render: boolean;
    }[]
  >([]);

  function show(_message: string, _type?: 'success' | 'error') {
    const obj = {
      message: _message,
      type: _type || 'error',
      active: true,
      render: true,
    };

    messages.push(obj);

    setTimeout(() => {
      const index = messages.indexOf(obj);
      if (index === -1) return;
      messages[index].active = false;

      setTimeout(() => {
        messages[index].render = false;
      }, 300);
    }, 3000);
  }
  function reset() {
    messages.splice(0);
  }

  return { messages, show, reset };
});

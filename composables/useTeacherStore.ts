export const useTeacherStore = defineStore('teacher', () => {
  const id = ref(0);
  const init = {
    code: '',
    name: '',
    gender: '',
    birthDate: '',
    birthPlace: '',
    address: '',
    phone: '',
  };

  const data = ref({ ...init });
  const error = ref({ ...init });

  async function load(_id?: number): Promise<void> {
    if (_id) id.value = _id;
    else if (!id.value) return;

    const result = await useApi<{ teacher: any }>(`/teachers/${id.value}`, {});

    if (result.data.value) {
      data.value.code = result.data.value.teacher.code;
      data.value.name = result.data.value.teacher.name;
      data.value.gender = result.data.value.teacher.profile.gender;
      data.value.birthDate = result.data.value.teacher.profile.birthDate;
      data.value.birthPlace = result.data.value.teacher.profile.birthPlace;
      data.value.address = result.data.value.teacher.profile.address;
      data.value.phone = result.data.value.teacher.profile.phone;

      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/teachers', toValue(data));

    if (err) {
      error.value.code = err.code;
      error.value.name = err.name;
      error.value.gender = err.gender;
      error.value.birthDate = err.birthDate;
      error.value.birthPlace = err.birthPlace;
      error.value.address = err.address;
      error.value.phone = err.phone;

      return false;
    }

    error.value = { ...init };
    return true;
  }

  async function update(): Promise<boolean> {
    const err = await useApiUpdate(`/teachers/${id.value}`, toValue(data));

    if (err) {
      error.value.code = err.code;
      error.value.name = err.name;
      error.value.gender = err.gender;
      error.value.birthDate = err.birthDate;
      error.value.birthPlace = err.birthPlace;
      error.value.address = err.address;
      error.value.phone = err.phone;
      return false;
    }

    error.value = { ...init };
    return true;
  }

  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/teachers/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  function reset() {
    id.value = 0;
    data.value = { ...init };
    error.value = { ...init };
  }
  return { id, data, error, load, create, update, delete: destroy, reset };
});

export const useStudentStore = defineStore('student', () => {
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

    const result = await useApi<{ student: any }>(`/students/${id.value}`, {});

    if (result.data.value) {
      data.value.code = result.data.value.student.code;
      data.value.name = result.data.value.student.name;
      data.value.gender = result.data.value.student.profile.gender;
      data.value.birthDate = result.data.value.student.profile.birthDate;
      data.value.birthPlace = result.data.value.student.profile.birthPlace;
      data.value.address = result.data.value.student.profile.address;
      data.value.phone = result.data.value.student.profile.phone;

      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/students', toValue(data));

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
    const err = await useApiUpdate(`/students/${id.value}`, toValue(data));

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
    const err = await useApiDelete(`/students/${id.value}`);
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

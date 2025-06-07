<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'load-course'],
});

const course = useCourseStore();
const page = useRouteQuery<number>('page', 1);
const classId = useRouteQuery<number>('class');
const teacherId = ref('');
const teacherError = computed(() => !teacherId.value && selecteds.value.length > 0);

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Courses', href: '/admin/courses' },
  { text: `${course.data.name}`, href: `/admin/courses/${course.id}` },
  { text: 'Enrollment' },
]);

const { data, refresh, pending } = await useApi<{ students: any[]; meta: any }>(`/courses/${course.id}/students`, {
  key: 'course-students-available',
  query: {
    limit: 10,
    page,
    classId,
    available: true,
  },
  default: () => ({ students: [], meta: {} }),
});

const students = ref(data.value.students);
watchImmediate(data, v => (students.value = data.value.students.map(s => ({ ...s, selected: false, status: 'none' }))));
watch(page, () => {
  selecteds.value = [];
  lastSelected.value = -1;
});

const selecteds = ref<number[]>([]);
const lastSelected = ref<number>(-1);

function handleClick(event: MouseEvent, id: number, index: number) {
  if (!event.shiftKey) {
    lastSelected.value = index;
    return;
  }

  if (lastSelected.value < 0) return;

  const start = lastSelected.value > index ? index : lastSelected.value;
  const stop = lastSelected.value > index ? lastSelected.value : index;

  const accumulation = [];

  for (let i = start; i <= stop; i++) {
    const student = students.value[i];

    if (!student) continue;
    if (student.selected) continue;

    if (i != index) {
      student.selected = true;
    }
    accumulation.push(i);
  }

  selecteds.value = [...selecteds.value, ...accumulation];
}

function handleEnroll() {
  for (const index of selecteds.value) {
    const student = students.value[index];
    if (student && student.status != 'enrolled') {
      student.status = 'enrolling';

      $fetch(`/courses/${course.id}/students`, {
        method: 'POST',
        body: {
          studentId: student.id,
          teacherId: toValue(teacherId),
        },
        ...useFetchOption(),
      })
        .then(() => {
          student.status = 'enrolled';
        })
        .catch(() => {
          student.status = 'failed';
        });
    }
  }
}

async function handleReset() {
  page.value = 1;
  selecteds.value = [];
  teacherId.value = '';

  await refresh();
}
</script>

<template>
  <Main title="Student Enrollment" disable-add-button>
    <template #menu>
      <SelectClass />
    </template>

    <Table :columns="['Code', 'Name', 'Select', 'Status']">
      <tr
        v-for="(s, index) in students"
        :key="s.id"
        :class="{ 'bg-primary-content text-primary': s.selected }"
        class="hover:bg-base-300"
        tabindex="0"
      >
        <TableCell :loading="pending" isTh>{{ s.id }}</TableCell>
        <TableCell :loading="pending">{{ s.code }}</TableCell>
        <TableCell :loading="pending">{{ s.name }}</TableCell>
        <TableCell :loading="pending">
          <input
            type="checkbox"
            :disabled="s.status == 'enrolled'"
            class="checkbox checkbox-primary"
            @click="handleClick($event, s.id, index)"
            @change="s.selected = !s.selected"
            v-model="selecteds"
            :value="index"
          />
        </TableCell>
        <TableCell :loading="pending">
          <BadgeStatus label="Course" :status="s.status" />
        </TableCell>
        <td><Loader :loading="pending" /></td>
      </tr>
      <template v-if="!classId" #fallback>Please select a class</template>
      <template v-else #fallback>
        <div>All students already in this course</div>
        <div>or this class has no students yet.</div>
      </template>
    </Table>

    <div class="flex flex-col md:flex-row gap-4 justify-end mt-4">
      <Pagination class="md:ml-0 ml-auto mr-auto" v-bind="resolveMeta(data.meta)" />

      <div class="flex flex-wrap md:flex-nowrap justify-center items-center gap-4">
        <SelectTeacher :class="[teacherError ? 'select-accent' : 'select-primary']" v-model="teacherId" />
        <input type="checkbox" class="toggle toggle-accent md:order-first" />
        <div class="flex justify-center gap-4">
          <button class="btn btn-primary" @click="handleEnroll">Enroll</button>
          <button class="btn btn-secondary" @click="handleReset">Refresh</button>
        </div>
      </div>
    </div>
  </Main>
</template>

<style scoped></style>

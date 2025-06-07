<script setup lang="ts">
import { Icon } from '@iconify/vue';

definePageMeta({
  middleware: ['auth', 'load-course'],
});

const course = useCourseStore();
const page = useRouteQuery<number>('page', 1);
const classId = useRouteQuery<number>('class');
const teacherId = ref('');
const teacherError = computed(() => !teacherId.value && selecteds.value.length > 0);
const inverse = ref(false);

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
    available: computed(() => {
      return inverse.value ? null : 1;
    }),
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
        method: inverse.value ? 'DELETE' : 'POST',
        body: {
          studentId: student.id,
          teacherId: inverse.value ? null : toValue(teacherId),
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
      <SelectClass class="w-full md:w-auto" />
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
          <BadgeStatus :inverse="inverse" label="Course" :status="s.status" />
        </TableCell>
        <td><Loader :loading="pending" /></td>
      </tr>
      <template v-if="!classId" #fallback>Please select a class</template>
      <template v-else #fallback>
        <div>All students already in this course</div>
        <div>or this class has no students yet.</div>
      </template>
    </Table>

    <div v-if="classId" class="flex flex-col md:flex-row gap-4 justify-end mt-4">
      <div class="flex items-center gap-4 md:ml-0 ml-auto mr-auto">
        <Pagination class="" v-bind="resolveMeta(data.meta)" />

        <button class="btn join-item font-bold btn-secondary btn-soft" @click="handleReset">
          <div class="flex items-center gap-2">
            <Icon icon="mingcute:refresh-3-fill" class="text-xl" />
          </div>
        </button>
      </div>

      <div class="flex flex-wrap md:flex-nowrap justify-center items-center gap-4">
        <template v-if="!inverse">
          <SelectTeacher :class="[teacherError ? 'select-accent' : 'select-primary']" v-model="teacherId" />
          <button class="btn btn-primary" @click="handleEnroll">Enroll</button>
        </template>
        <template v-else>
          <button class="btn btn-accent" @click="handleEnroll">Unenroll</button>
        </template>
        <button
          class="btn join-item font-bold"
          :class="inverse ? 'btn-accent' : 'btn-primary'"
          @click="inverse = !inverse"
        >
          <div class="flex items-center gap-2">
            <Icon icon="mingcute:transfer-3-fill" class="text-xl" />
          </div>
        </button>
      </div>
    </div>
  </Main>
</template>

<style scoped></style>

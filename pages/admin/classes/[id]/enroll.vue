<script lang="ts" setup>
definePageMeta({
  middleware: ['auth', 'load-class'],
});

const $class = useClassStore();

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Class', href: '/admin/classes' },
  { text: `${$class.data.name}`, href: `/admin/classes/${$class.id}` },
  { text: 'Enrollment' },
]);

// !
const deleteMode = ref(false);
watch(deleteMode, v => {
  page.value = 1;
});

const page = useRouteQuery<number>('page', 1);
const url = computed(() => {
  if (deleteMode.value) {
    return `/classes/${$class.id}/students`;
  }
  return `/students/available`;
});

const { data, refresh, pending } = await useApi<{ students: any[]; meta: any }>(url, {
  key: 'available-students',
  default: () => ({ students: [], meta: {} }),
  query: { page, limit: 10 },
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

      $fetch(`/classes/${$class.id}/students`, {
        method: deleteMode.value ? 'DELETE' : 'POST',
        body: { studentId: student.id },
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
}

function getStatusClass(status: string) {
  if (deleteMode.value) {
    switch (status) {
      case 'enrolled':
        return 'status-primary';
      case 'enrolling':
        return 'status-warning';
      case 'failed':
        return 'status-error';
      default:
        return 'status-success';
    }
  } else {
    switch (status) {
      case 'enrolled':
        return 'status-success';
      case 'enrolling':
        return 'status-warning';
      case 'failed':
        return 'status-error';
      default:
        return 'status-primary';
    }
  }
}
function getStatusText(status: string) {
  if (deleteMode.value) {
    switch (status) {
      case 'enrolled':
        return 'Not in Class';
      case 'enrolling':
        return 'Unenrolling...';
      case 'failed':
        return 'Failed to Unenroll';
      default:
        return 'Enrolled';
    }
  } else {
    switch (status) {
      case 'enrolled':
        return 'Enrolled';
      case 'enrolling':
        return 'Enrolling...';
      case 'failed':
        return 'Failed to Enroll';
      default:
        return 'Not in Class';
    }
  }
}
</script>

<template>
  <Main title="Student Enrollment" disable-add-button>
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
          <div class="flex gap-2 items-center">
            <div class="inline-grid *:[grid-area:1/1]">
              <div :class="['status', getStatusClass(s.status), 'animate-ping']"></div>
              <div :class="['status', getStatusClass(s.status)]"></div>
            </div>
            {{ getStatusText(s.status) }}
          </div>
        </TableCell>
        <td><Loader :loading="pending" /></td>
      </tr>
    </Table>

    <div class="flex flex-col md:flex-row gap-4 justify-end mt-4">
      <Pagination class="md:ml-0 ml-auto mr-auto" v-bind="resolveMeta(data.meta)" />

      <div class="flex justify-center items-center gap-4">
        <button class="btn btn-secondary" @click="handleReset">Refresh</button>
        <button class="btn" :class="[deleteMode ? 'btn-accent' : 'btn-primary']" @click="handleEnroll">
          <span v-if="deleteMode"> Unenroll </span>
          <span v-else> Enroll </span>
        </button>
        <input type="checkbox" v-model="deleteMode" class="toggle toggle-accent" />
      </div>
    </div>
  </Main>
</template>

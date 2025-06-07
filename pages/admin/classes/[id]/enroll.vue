<script lang="ts" setup>
import { Icon } from '@iconify/vue';

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
const inverse = ref(false);
watch(inverse, v => {
  page.value = 1;
});

const page = useRouteQuery<number>('page', 1);
const url = computed(() => {
  if (inverse.value) {
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
        method: inverse.value ? 'DELETE' : 'POST',
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
  selecteds.value = [];
  await refresh();
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
          <BadgeStatus label="Class" :status="s.status" :inverse="inverse" />
        </TableCell>
        <td><Loader :loading="pending" /></td>
      </tr>
    </Table>

    <div class="flex flex-col md:flex-row gap-4 justify-end mt-4">
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

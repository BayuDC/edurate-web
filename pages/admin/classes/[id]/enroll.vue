<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const $class = useClassStore();

$class.id = parseInt(route.params.id as string);
await $class.load();

setBreadcrumb([
  { text: 'Admin', href: '/' },
  { text: 'Class', href: '/admin/classes' },
  { text: `${$class.data.name}`, href: `/admin/classes/${$class.id}` },
  { text: 'Enrollment' },
]);

// !

const { data, refresh } = await useApi<{ students: any[] }>(`/students/available`, {
  default: () => ({ students: [] }),
});
const students = ref(data.value.students);
watchImmediate(
  () => data.value.students,
  v => (students.value = v.map(s => ({ ...s, selected: false, status: 'none' })))
);

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

      // Simulate an API call to enroll the student
      setTimeout(() => {
        student.status = 'enrolled';
      }, 1000);
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
        <th>{{ s.id }}</th>
        <td>{{ s.code }}</td>
        <td>{{ s.name }}</td>
        <td>
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            @click="handleClick($event, s.id, index)"
            @change="s.selected = !s.selected"
            v-model="selecteds"
            :value="index"
          />
        </td>
        <td class="">
          <div v-if="s.status == 'none'" class="flex gap-2 items-center">
            <div class="inline-grid *:[grid-area:1/1]">
              <div class="status status-primary animate-ping"></div>
              <div class="status status-primary"></div>
            </div>
            Not in Class
          </div>
          <div v-else-if="s.status == 'enrolled'" class="flex gap-2 items-center">
            <div class="inline-grid *:[grid-area:1/1]">
              <div class="status status-success animate-ping"></div>
              <div class="status status-success"></div>
            </div>
            Enrolled
          </div>
          <div v-else-if="s.status == 'enrolling'" class="flex gap-2 items-center">
            <div class="inline-grid *:[grid-area:1/1]">
              <div class="status status-warning animate-ping"></div>
              <div class="status status-warning"></div>
            </div>
            Enrolling...
          </div>
          <div v-else-if="s.status == 'failed'" class="flex gap-2 items-center">
            <div class="inline-grid *:[grid-area:1/1]">
              <div class="status status-error animate-ping"></div>
              <div class="status status-error"></div>
            </div>
            Failed to Enroll
          </div>
        </td>
      </tr>
    </Table>

    <div class="flex justify-end mt-4">
      <button
        class="btn btn-secondary"
        @click="
          () => {
            selecteds = [];
            refresh();
          }
        "
      >
        Refresh
      </button>
      <button class="btn btn-primary ml-2" @click="handleEnroll">Enroll</button>
    </div>
  </Main>
</template>

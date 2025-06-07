<script setup lang="ts">
export type StatusType = 'none' | 'enrolled' | 'enrolling' | 'failed';

interface Props {
  status: StatusType;
  inverse?: boolean;
  label: string;
}

const props = withDefaults(defineProps<Props>(), {
  inverse: false,
});

function getStatusClass(status: StatusType) {
  if (props.inverse) {
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

function getStatusText(status: StatusType) {
  if (props.inverse) {
    switch (status) {
      case 'enrolled':
        return 'Not in ' + props.label;
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
        return 'Not in ' + props.label;
    }
  }
}
</script>

<template>
  <div class="flex gap-2 items-center">
    <div class="inline-grid *:[grid-area:1/1]">
      <div :class="['status', getStatusClass(status), 'animate-ping']"></div>
      <div :class="['status', getStatusClass(status)]"></div>
    </div>
    {{ getStatusText(status) }}
  </div>
</template>

<style scoped></style>

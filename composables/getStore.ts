export default function useGetStore(store: 'class' | 'course' | 'period' | 'student' | 'teacher' | string) {
  switch (store) {
    case 'class':
      return useClassStore();
    case 'course':
      return useCourseStore();
    case 'period':
      return usePeriodStore();
    case 'student':
      return useStudentStore();
    case 'teacher':
      return useTeacherStore();
    default:
      throw new Error('Invalid store type');
  }
}

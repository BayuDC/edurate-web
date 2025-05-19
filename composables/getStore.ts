export default function useGetStore(store: 'class' | 'course' | 'period' | string) {
  switch (store) {
    case 'class':
      return useClassStore();
    case 'course':
      return useCourseStore();
    case 'period':
      return usePeriodStore();
    default:
      throw new Error('Invalid store type');
  }
}

export default function useResolveMeta(meta: any) {
  return {
    current: meta.currentPage,
    first: meta.firstPage,
    last: meta.lastPage,
  };
}

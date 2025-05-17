interface Breadcrumb {
  text: string;
  href?: string;
}

export default function useBreadcrumb() {
  return useState<Breadcrumb[]>('breadcrumb', () => {
    return [];
  });
}

export function setBreadcrumb(breadcrumbs: Breadcrumb[]) {
  const breadcrumbState = useBreadcrumb();
  breadcrumbState.value = breadcrumbs;
}

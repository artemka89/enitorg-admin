export function searchParamsToString(params?: Record<string, unknown>) {
  if (!params) {
    return '';
  }
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      Number.isNaN(value)
    ) {
      return '';
    }

    searchParams.set(key, String(value));
  });

  const searchParamsString = searchParams.toString();

  if (!searchParamsString.trim()) {
    return '';
  }

  return '?' + searchParamsString;
}

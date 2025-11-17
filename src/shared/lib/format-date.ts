export function formatDate(date: string, time = false) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(time && { hour: 'numeric', minute: 'numeric' }),
  });
}

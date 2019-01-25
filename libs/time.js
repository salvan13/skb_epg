export function formatTime(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric', minute: 'numeric', hour12: false
  }).format(date);
}

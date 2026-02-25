export function formatPrice(value) {
  try {
    const number = new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 0,
    }).format(value);

    return `${number} сом`;
  } catch {
    return String(value);
  }
}

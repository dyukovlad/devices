// Валидируем денежную сумму: неотрицательное число, максимум 2 знака после запятой.
// Важно для финансовых приложений:
// 1. Предотвращает ошибки округления при расчётах
// 2. Обеспечивает консистентность данных в базе
// 3. Избегает проблем с точностью плавающей точки
// 4. Соответствует стандартам денежных единиц (копейки, центы)
// 5. Уменьшает риски финансовых уязвимостей от манипуляций дробной частью

export type AmountValidation = { ok: true } | { ok: false; error: string };

export function validateAmount(input: string): AmountValidation {
  const raw = input.trim();
  if (!raw) return { ok: false, error: 'Введите сумму' };
  const normalized = raw.replace(',', '.');
  // Разрешаем целые и десятичные числа с 1-2 знаками после разделителя
  if (!/^\d+(?:[\.]\d{1,2})?$/.test(normalized)) {
    return { ok: false, error: 'Макс. 2 знака после запятой' };
  }
  const value = Number(normalized);
  if (!isFinite(value) || value < 0) return { ok: false, error: 'Некорректная сумма' };
  return { ok: true };
}

export function toAmountNumber(input: string): number | null {
  const raw = input.trim();
  if (!raw) return null;
  const normalized = raw.replace(',', '.');

  // Проверяем, что число имеет не более 2 знаков после точки
  const parts = normalized.split('.');
  if (parts.length === 2 && parts[1].length > 2) {
    return null; // Слишком много знаков после запятой
  }

  const n = Number(normalized);
  return isFinite(n) && n >= 0 ? Number(n.toFixed(2)) : null;
}

export function formatAmount(n: number): string {
  return n.toFixed(2);
}

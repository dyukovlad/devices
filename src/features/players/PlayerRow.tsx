'use client';

import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateDevicePlaceBalance, type DevicePlace } from '@shared/api/devices';
import { formatAmount, toAmountNumber, validateAmount } from '@shared/utils/amount';
import { useToast } from '@shared/ui/ToastProvider';
import PinPad from './PinPad';

export default function PlayerRow({
  place,
  deviceId,
  onPlaceUpdate,
}: {
  place: DevicePlace;
  deviceId: number;
  onPlaceUpdate: (p: DevicePlace) => void;
}) {
  const { notifyError, notifySuccess } = useToast();
  const [amount, setAmount] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [localPlace, setLocalPlace] = useState<DevicePlace>(place);
  const [showPinPad, setShowPinPad] = useState(false);

  const doOp = async (delta: number) => {
    // Проверяем валидность суммы перед отправкой
    const v = validateAmount(amount);
    if (!v.ok) {
      notifyError(v.error);
      return;
    }

    const n = toAmountNumber(amount);
    if (n === null) {
      notifyError('Некорректная сумма');
      return;
    }

    if (n <= 0) {
      notifyError('Сумма должна быть больше нуля');
      return;
    }

    // Проверяем, не станет ли баланс слишком отрицательным при снятии
    if (delta < 0) {
      const currentBalance = localPlace.balances / 100; // Конвертируем из копеек в рубли
      const newBalance = currentBalance - n;
      if (newBalance < -1000) {
        notifyError('Недостаточно средств на балансе');
        return;
      }
    }

    // Конвертируем в копейки/центы (умножаем на 100)
    const deltaInCents = Math.round(delta * n * 100);

    setSubmitting(true);
    try {
      const updatedPlace = await updateDevicePlaceBalance(deviceId, localPlace.place, deltaInCents);
      setLocalPlace(updatedPlace);
      onPlaceUpdate(updatedPlace);
      setAmount('');
      notifySuccess(`${delta > 0 ? 'Внесено' : 'Снято'} ${Math.abs(delta * n).toFixed(2)}`);
    } catch (e: any) {
      // Обрабатываем разные типы серверных ошибок
      let errorMessage = 'Операция не выполнена';

      if (e?.status === 400) {
        errorMessage = e?.message || 'Некорректные данные';
      } else if (e?.status === 401) {
        errorMessage = 'Не авторизован';
      } else if (e?.status === 403) {
        errorMessage = 'Недостаточно прав';
      } else if (e?.status === 404) {
        errorMessage = 'Устройство или место не найдено';
      } else if (e?.status === 408) {
        errorMessage = 'Превышено время ожидания';
      } else if (e?.status === 500) {
        errorMessage = e?.message || 'Внутренняя ошибка сервера';
      } else if (e?.message) {
        // Используем сообщение от сервера, если оно есть
        errorMessage = e.message;
      }

      notifyError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const validation = amount.trim() === '' ? { ok: true, error: '' } : validateAmount(amount);
  const isAmountValid = validation.ok;

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <div className="fw-semibold">Место {localPlace.place}</div>
          <div className="text-muted small">
            Баланс: {formatAmount(localPlace.balances)} {localPlace.currency}
          </div>
        </div>
        <Button variant="outline-secondary" size="sm" onClick={() => setShowPinPad((s) => !s)}>
          {showPinPad ? 'Скрыть' : 'Пинпад'}
        </Button>
      </div>

      <div className="d-flex gap-2 mb-2">
        <Form.Group controlId={`amount-${localPlace.place}`} className="flex-grow-1">
          <Form.Control
            type="text"
            inputMode="decimal"
            placeholder="Введите сумму"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              // Разрешаем только цифры, точку и запятую
              const filtered = value.replace(/[^0-9.,]/g, '');
              setAmount(filtered);
            }}
            isInvalid={!isAmountValid && amount.trim() !== ''}
            size="sm"
            disabled={submitting}
          />
          {!isAmountValid && amount.trim() !== '' && (
            <Form.Control.Feedback type="invalid">
              {validation.error || 'Некорректная сумма'}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </div>

      <div className="d-flex gap-2">
        <Button
          variant="success"
          size="sm"
          disabled={!isAmountValid || amount.trim() === '' || submitting}
          onClick={() => doOp(1)}
          className="flex-fill"
        >
          {submitting ? 'Обработка...' : 'Внести'}
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          disabled={!isAmountValid || amount.trim() === '' || submitting}
          onClick={() => doOp(-1)}
          className="flex-fill"
        >
          {submitting ? 'Обработка...' : 'Снять'}
        </Button>
      </div>

      {showPinPad && (
        <div className="mt-2">
          <PinPad value={amount} onChange={setAmount} />
        </div>
      )}
    </div>
  );
}

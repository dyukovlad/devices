'use client';

import { useCallback } from 'react';
import { Button } from 'react-bootstrap';

export default function PinPad({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const push = useCallback((ch: string) => onChange(value + ch), [value, onChange]);
  const back = useCallback(() => onChange(value.slice(0, -1)), [value, onChange]);
  const clear = useCallback(() => onChange(''), [onChange]);
  return (
    <div className="d-grid gap-1" style={{ maxWidth: '100%' }}>
      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
          <Button key={d} variant="secondary" size="sm" onClick={() => push(d)} className="p-2">
            {d}
          </Button>
        ))}
        <Button variant="secondary" size="sm" onClick={() => push('.')} className="p-2">
          .
        </Button>
        <Button variant="secondary" size="sm" onClick={() => push('0')} className="p-2">
          0
        </Button>
        <Button variant="warning" size="sm" onClick={back} className="p-2">
          ⌫
        </Button>
      </div>
      <div className="d-flex gap-1">
        <Button variant="outline-secondary" size="sm" className="flex-fill" onClick={clear}>
          Очистить
        </Button>
      </div>
    </div>
  );
}

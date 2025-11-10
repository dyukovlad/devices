'use client';

import { useEffect, useState } from 'react';
import { Alert, ListGroup, Spinner } from 'react-bootstrap';
import { getDeviceById, type Device } from '@shared/api/devices';
import PlayerRow from './PlayerRow';
import { useToast } from '@shared/ui/ToastProvider';

export default function PlayersList({ deviceId }: { deviceId: number }) {
  const { notifyError } = useToast();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getDeviceById(deviceId)
      .then((d) => mounted && setDevice(d))
      .catch((e: any) => {
        const msg = e?.message || 'Не удалось загрузить устройство';
        setError(msg);
        notifyError(msg);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [deviceId, notifyError]);

  if (loading && !device) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 120 }}>
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <ListGroup>
      {(device?.places || []).map((place) => (
        <ListGroup.Item key={place.place} className="p-3">
          <PlayerRow
            place={place}
            deviceId={deviceId}
            onPlaceUpdate={(updatedPlace) =>
              setDevice((prev) =>
                prev
                  ? {
                      ...prev,
                      places: prev.places.map((p) =>
                        p.place === updatedPlace.place ? updatedPlace : p
                      ),
                    }
                  : null
              )
            }
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

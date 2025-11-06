import { useEffect, useState } from 'react';
import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap';
import { getDevices, type Device } from '@shared/api/devices';
import PlayersList from '@features/players/PlayersList';
import { useToast } from '@shared/ui/ToastProvider';

export default function DevicesPage() {
  const { notifyError } = useToast();
  const [devices, setDevices] = useState<Device[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getDevices()
      .then((d) => {
        if (mounted) setDevices(d);
      })
      .catch((e: any) => {
        const msg = e?.message || 'Не удалось загрузить девайсы';
        setError(msg);
        notifyError(msg);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [notifyError]);

  if (loading && !devices) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-3">
      {(devices || []).map((dev) => (
        <Col key={dev.id}>
          <Card className={`mb-3 ${expandedId === dev.id ? 'border-primary shadow-sm' : ''}`}>
            <Card.Body
              onClick={() => setExpandedId(expandedId === dev.id ? null : dev.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setExpandedId(expandedId === dev.id ? null : dev.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === dev.id}
              aria-controls={`device-${dev.id}-content`}
              className="cursor-pointer p-3"
            >
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title id={`device-${dev.id}-header`} className="mb-0 h5">
                  {dev.name}
                </Card.Title>
                <span
                  className={`badge ${expandedId === dev.id ? 'bg-primary' : 'bg-secondary'}`}
                  aria-hidden="true"
                >
                  {expandedId === dev.id ? '▼' : '▶'}
                </span>
              </div>
            </Card.Body>
            {expandedId === dev.id && (
              <Card.Body
                id={`device-${dev.id}-content`}
                className="border-top bg-light"
                style={{ maxHeight: '500px', overflowY: 'auto' }}
                role="region"
                aria-labelledby={`device-${dev.id}-header`}
              >
                <PlayersList deviceId={dev.id} key={`players-${dev.id}`} />
              </Card.Body>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
}

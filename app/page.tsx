'use client';

import { Container, Navbar } from 'react-bootstrap';
import DevicesPage from '../src/features/devices/DevicesPage';
import { ErrorBoundary } from '../src/shared/ui/ErrorBoundary';

export default function Home() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand>Devices & Players</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mb-5">
        <ErrorBoundary>
          <DevicesPage />
        </ErrorBoundary>
      </Container>
    </>
  );
}

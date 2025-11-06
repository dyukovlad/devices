import { Container, Navbar } from 'react-bootstrap';
import DevicesPage from '@features/devices/DevicesPage';
import { ToastProvider } from '@shared/ui/ToastProvider';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
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
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;

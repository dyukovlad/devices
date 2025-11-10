import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button } from 'react-bootstrap';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Alert variant="danger" className="m-3">
          <Alert.Heading>Что-то пошло не так</Alert.Heading>
          <p>Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.</p>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Попробовать снова
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}

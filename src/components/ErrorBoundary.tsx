import React, { PureComponent } from 'react';

type Props = { children: React.ReactNode };

type State = { hasError: boolean };

class ErrorBoundary extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <div>Something went wrong.</div>;
    }

    return children;
  }
}

export default ErrorBoundary;

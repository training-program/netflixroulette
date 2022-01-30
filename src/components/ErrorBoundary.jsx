import React, { Component } from 'react';
import { element, oneOfType, arrayOf } from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
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

ErrorBoundary.propTypes = {
  children: oneOfType([arrayOf(element), element]).isRequired,
};

export default ErrorBoundary;

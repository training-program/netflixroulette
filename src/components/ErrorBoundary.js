import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    stub: PropTypes.element,
  };
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.stub || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

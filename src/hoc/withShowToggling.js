import React, { Component, createRef, forwardRef } from 'react';

const withShowToggling = Wrapped =>
  class WithShowToggling extends Component {
    static displayName = `${this.name}(${Wrapped.displayName || Wrapped.name || 'Component'})`;

    ref = createRef();
    state = { showElement: false };
    componentWillUnmount() {
      this.ref.current.removeEventListener('focusout', this.handleBlur);
    }
    handleToggle = event => {
      const element = this.ref.current;
      if (!this.state.showElement) {
        element.tabIndex = 1;
        element.focus();
        element.addEventListener('focusout', this.handleBlur);
        this.setState({ showElement: true });
      } else {
        element.tabIndex = false;
        element.removeEventListener('focusout', this.handleBlur);
        this.setState({ showElement: false });

        this.props.onClose && this.props.onClose(event);
      }
    };
    handleBlur = event => {
      if (
        document.activeElement === event.target ||
        event.currentTarget.contains(event.relatedTarget)
      )
        return;

      this.setState({ showElement: false });

      const { onClose } = this.props;

      if (onClose) onClose(event);
    };
    render() {
      return (
        <Wrapped
          focusedRef={this.ref}
          onToggle={this.handleToggle}
          showElement={this.state.showElement}
          {...this.props}
        />
      );
    }
  };

export default withShowToggling;

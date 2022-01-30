import React, { Component, createRef } from 'react';
import { func } from 'prop-types';

const withShowToggling = (Wrapped) => {
  class WithShowToggling extends Component {
    ref = createRef();

    constructor(props) {
      super(props);

      this.state = {
        showElement: false,
      };
    }

    componentWillUnmount() {
      this.ref.current.removeEventListener('focusout', this.handleBlur);
    }

    handleToggle = (event) => {
      const element = this.ref.current;
      const { showElement } = this.state;
      const { onClose } = this.props;

      if (!showElement) {
        element.tabIndex = 1;
        element.focus();
        element.addEventListener('focusout', this.handleBlur);
        this.setState({ showElement: true });
      } else {
        element.tabIndex = false;
        element.removeEventListener('focusout', this.handleBlur);
        this.setState({ showElement: false });

        if (onClose) onClose(event);
      }
    };

    handleBlur = (event) => {
      if (
        document.activeElement === event.target
        || event.currentTarget.contains(event.relatedTarget)
      ) return;

      this.setState({ showElement: false });

      const { onClose } = this.props;

      if (onClose) onClose(event);
    };

    render() {
      const { showElement } = this.state;

      return (
        <Wrapped
          focusedRef={this.ref}
          onToggle={this.handleToggle}
          showElement={showElement}
          {...this.props}
        />
      );
    }
  }

  WithShowToggling.displayName = `${WithShowToggling.name}(${
    Wrapped.displayName || Wrapped.name || 'Component'
  })`;

  WithShowToggling.propTypes = {
    onClose: func,
  };

  WithShowToggling.defaultProps = {
    onClose: null,
  };

  return WithShowToggling;
};

export default withShowToggling;

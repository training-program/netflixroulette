import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

const withHiding = (Wrapped) => {
  class WithHiding extends Component {
    ref = createRef();

    componentDidMount() {
      const element = this.ref.current;
      element.tabIndex = 1;
      element.focus();
      element.addEventListener('focusout', this.handleBlur);
    }

    componentWillUnmount() {
      this.ref.current.removeEventListener('focusout', this.handleBlur);
    }

    handleBlur = (event) => {
      const { onClose } = this.props;

      if (
        document.activeElement === event.target
        || event.currentTarget.contains(event.relatedTarget)
      ) {
        return;
      }

      onClose(event);
    };

    render() {
      return <Wrapped focusedRef={this.ref} {...this.props} />;
    }
  }

  WithHiding.displayName = `${WithHiding.name}(${
    Wrapped.displayName || Wrapped.name || 'Component'
  })`;

  WithHiding.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  return WithHiding;
};

export default withHiding;

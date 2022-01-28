import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

const withHiding = Wrapped =>
  class WithHiding extends Component {
    static displayName = `${this.name}(${Wrapped.displayName || Wrapped.name || 'Component'})`;
    static propTypes = {
      onClose: PropTypes.func.isRequired,
    };
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
    handleBlur = event => {
      if (
        document.activeElement === event.target ||
        event.currentTarget.contains(event.relatedTarget)
      )
        return;

      this.props.onClose(event);
    };
    render() {
      return <Wrapped focusedRef={this.ref} {...this.props} />;
    }
  };

export default withHiding;

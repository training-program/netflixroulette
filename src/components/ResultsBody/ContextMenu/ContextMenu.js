import React, { PureComponent } from 'react';
import styles from './ContextMenu.module.scss';
import { number, func, object } from 'prop-types';

import withHiding from 'Utils/hoc/withHiding';

const RIGHT_OFFSET = 210;
const BOTTOM_OFFSET = 115;

class ContextMenu extends PureComponent {
  static propTypes = {
    id: number.isRequired,
    coordX: number.isRequired,
    coordY: number.isRequired,
    onOpenEdit: func.isRequired,
    onOpenDelete: func.isRequired,
    onClose: func.isRequired,
    focusedRef: object.isRequired,
  };

  handleEditClick = () => {
    this.props.onOpenEdit(this.props.id);
    this.props.onClose();
  };
  handlDeleteClick = () => {
    this.props.onOpenDelete(this.props.id);
    this.props.onClose();
  };
  render() {
    const { coordX, coordY, onClose, focusedRef } = this.props;
    const x = Math.min(innerWidth - RIGHT_OFFSET, coordX);
    const y = Math.min(window.pageYOffset + innerHeight - BOTTOM_OFFSET, coordY);

    return (
      <div ref={focusedRef} className={styles.menu} style={{ left: x, top: y }}>
        <a className={styles.closeButton} onClick={onClose} />
        <button className={styles.edit} onClick={this.handleEditClick}>
          Edit
        </button>
        <button className={styles.delete} onClick={this.handlDeleteClick}>
          Delete
        </button>
      </div>
    );
  }
}

export default withHiding(ContextMenu);

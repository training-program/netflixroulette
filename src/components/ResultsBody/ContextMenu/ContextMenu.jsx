import React, { PureComponent } from 'react';
import { number, func } from 'prop-types';
import { RefProp } from '@src/types';
import withHiding from '@src/hoc/withHiding.jsx';
import styles from './ContextMenu.module.scss';

import Cross from '../../Cross/Cross.jsx';

const RIGHT_OFFSET = 210;
const BOTTOM_OFFSET = 115;

class ContextMenu extends PureComponent {
  handleEditClick = () => {
    const { onOpenEdit, onClose, id } = this.props;

    onOpenEdit(id);
    onClose();
  };

  handlDeleteClick = () => {
    const { onOpenDelete, onClose, id } = this.props;

    onOpenDelete(id);
    onClose();
  };

  render() {
    const {
      coordinateX, coordinateY, onClose, focusedRef,
    } = this.props;
    const x = Math.min(window.innerWidth - RIGHT_OFFSET, coordinateX);
    const y = Math.min(window.pageYOffset + window.innerHeight - BOTTOM_OFFSET, coordinateY);

    return (
      <div ref={focusedRef} className={styles.menu} style={{ left: x, top: y }}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <Cross side="12" />
        </button>

        <button type="button" className={styles.edit} onClick={this.handleEditClick}>
          Edit
        </button>
        <button type="button" className={styles.delete} onClick={this.handlDeleteClick}>
          Delete
        </button>
      </div>
    );
  }
}

ContextMenu.propTypes = {
  id: number.isRequired,
  coordinateX: number.isRequired,
  coordinateY: number.isRequired,
  onOpenEdit: func.isRequired,
  onOpenDelete: func.isRequired,
  onClose: func.isRequired,
  focusedRef: RefProp.isRequired,
};

export default withHiding(ContextMenu);

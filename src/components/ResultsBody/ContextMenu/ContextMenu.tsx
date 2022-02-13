import * as React from 'react';
import useHiding from '@src/hooks/useHiding';
import styles from './ContextMenu.module.scss';

import Cross from '../../Cross/Cross';

type Props = {
  coordinateX: number;
  coordinateY: number;
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  onClose: () => void;
};

const RIGHT_OFFSET = 210;
const BOTTOM_OFFSET = 115;

const ContextMenu = ({
  coordinateX, coordinateY, onOpenEdit, onOpenDelete, onClose,
}: Props) => {
  const focusedElementRef = useHiding(onClose);

  const handleEditClick = () => {
    onOpenEdit();
    onClose();
  };

  const handlDeleteClick = () => {
    onOpenDelete();
    onClose();
  };

  const x = Math.min(window.innerWidth - RIGHT_OFFSET, coordinateX);
  const y = Math.min(window.pageYOffset + window.innerHeight - BOTTOM_OFFSET, coordinateY);

  return (
    <div ref={focusedElementRef} className={styles.menu} style={{ left: x, top: y }}>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        <Cross side="12" />
      </button>

      <button type="button" className={styles.edit} onClick={handleEditClick}>
        Edit
      </button>
      <button type="button" className={styles.delete} onClick={handlDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default ContextMenu;

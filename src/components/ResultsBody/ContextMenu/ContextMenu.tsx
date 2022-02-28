import React, { useContext } from 'react';
import { RIGHT_OFFSET, BOTTOM_OFFSET } from '@src/utils/constants';
import useHiding from '@src/hooks/useHiding';
import { AppContext } from '@src/context/app.context';
import { ContextMenuProps } from './ContextMenu.types';
import styles from './ContextMenu.module.scss';

import Cross from '../../Cross/Cross';

const ContextMenu = ({ coordinateX, coordinateY, onClose }: ContextMenuProps) => {
  const focusedElementRef = useHiding(onClose);
  const { setShowEdit, setShowDelete } = useContext(AppContext);
  const handleEditClick = () => {
    setShowEdit(true);
    onClose();
  };

  const handlDeleteClick = () => {
    setShowDelete(true);
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

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RIGHT_OFFSET, BOTTOM_OFFSET } from '@src/utils/constants';
import useHiding from '@src/hooks/useHiding';
import { ContextMenuProps } from './ContextMenu.types';
import styles from './ContextMenu.module.scss';
import Cross from '../../Cross/Cross';

const ContextMenu = ({ coordinateX, coordinateY, onClose, id }: ContextMenuProps) => {
  const focusedElementRef = useHiding(onClose);
  const location = useLocation();

  const locationState = { backgroundLocation: location };

  const x = Math.min(window.innerWidth - RIGHT_OFFSET, coordinateX);
  const y = Math.min(window.pageYOffset + window.innerHeight - BOTTOM_OFFSET, coordinateY);

  return (
    <div ref={focusedElementRef} className={styles.menu} style={{ left: x, top: y }}>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        <Cross side="12" />
      </button>
      <Link to={`/movie/edit/${id}`} state={locationState}>
        <button type="button" className={styles.edit} onClick={onClose}>
          Edit
        </button>
      </Link>
      <Link to={`/movie/delete/${id}`} state={locationState}>
        <button type="button" className={styles.delete} onClick={onClose}>
          Delete
        </button>
      </Link>
    </div>
  );
};

export default ContextMenu;

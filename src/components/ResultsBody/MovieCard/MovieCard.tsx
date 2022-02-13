import React, { useMemo } from 'react';
import { extractYear } from '@src/utils/helpers';
import Poster from '@src/components/Poster/Poster';
import styles from './MovieCard.module.scss';

type Props = {
  id: number;
  title: string;
  tagline: string;
  release_date: string;
  poster_path: string;
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void;
};

const MovieCard = ({
  id,
  title,
  tagline,
  release_date,
  poster_path,
  onContextMenu,
  setCurrentId,
  onClick,
}: Props) => {
  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setCurrentId(id);
    onContextMenu(event);
  };

  const handleClick = () => {
    setCurrentId(id);
    onClick();
  };

  const handlePressUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter') {
      handleClick();
    }
  };

  const year = useMemo(() => (release_date ? extractYear(release_date) : 'N/A'), [release_date]);

  return title ? (
    <div
      className={styles.card}
      onContextMenu={handleOpenMenu}
      onClick={handleClick}
      onKeyUp={handlePressUp}
      role="button"
      tabIndex={0}
    >
      <Poster url={poster_path} className={styles.poster} />
      <div className={styles.info}>
        <div className={styles.info__left}>
          <span className={styles.info__title}>{title}</span>
          <span className={styles.info__tagline}>{tagline || title}</span>
        </div>
        <div className={styles.info__right}>
          <span className={styles.info__year}>{year}</span>
        </div>
      </div>
    </div>
  ) : null;
};

export default MovieCard;

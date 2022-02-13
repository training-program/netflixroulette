import React, { useState, useEffect } from 'react';
import { IMG_PLACEHOLDER } from '@src/utils/constants';
import styles from './MovieCard.module.scss';

type Props = {
  id: number;
  title: string;
  tagline: string;
  release_date: string;
  poster_path: string;
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
};

const MovieCard = ({
  id,
  title,
  tagline,
  release_date,
  poster_path,
  onContextMenu,
  setCurrentId,
}: Props) => {
  const [hasLoadImgError, setLoadImgError] = useState(false);

  useEffect(() => {
    setLoadImgError(false);
  }, [poster_path]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setCurrentId(id);
    onContextMenu(event);
  };

  const handleError = () => {
    setLoadImgError(true);
  };

  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';

  return title ? (
    <div className={styles.card} onContextMenu={handleOpenMenu}>
      <picture className={styles.poster}>
        {hasLoadImgError && (
          <img src={IMG_PLACEHOLDER} className={styles.poster__img} alt="Movie poster" />
        )}
        {!hasLoadImgError && (
          <img
            src={poster_path}
            className={styles.poster__img}
            alt="Movie poster"
            onError={handleError}
          />
        )}
      </picture>
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

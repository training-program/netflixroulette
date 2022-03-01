import React, { MouseEvent, KeyboardEvent, useContext } from 'react';
import { extractYear } from '@src/utils/helpers';
import Poster from '@src/components/Poster/Poster';
import AppContext from '@src/context/app.context';
import { MovieCardProps } from './MovieCard.types';
import styles from './MovieCard.module.scss';

const MovieCard = ({
  id,
  title,
  tagline,
  release_date,
  poster_path,
  onContextMenu,
}: MovieCardProps) => {
  const { setCurrentId, setShowMovieDetails } = useContext(AppContext);

  const handleOpenMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setCurrentId(id);
    onContextMenu(event);
  };

  const handleClick = () => {
    setCurrentId(id);
    setShowMovieDetails(true);
  };

  const handlePressUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter') {
      handleClick();
    }
  };

  const year = release_date ? extractYear(release_date) : 'N/A';

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

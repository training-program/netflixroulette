import React from 'react';
import styles from './MovieCard.module.scss';
import PropTypes from 'prop-types';

const MovieCard = props => {
  const movie = props.movie;
  const year = new Date(movie.release_date).getFullYear();
  const handleOpenMenu = e => {
    e.preventDefault();
    props.onContextMenu(e, props.movie.id);
  };

  return (
    !!movie.title && (
      <div className={styles.card} onContextMenu={handleOpenMenu}>
        <picture className={styles.poster}>
          <img src={movie.poster_path} alt="Movie poster" />
        </picture>
        <div className={styles.info}>
          <div className={styles.info__left}>
            <span className={styles.info__title}>{movie.title}</span>
            <span className={styles.info__tagline}>{movie.tagline || movie.title}</span>
          </div>
          {!!year && (
            <div className={styles.info__right}>
              <span className={styles.info__year}>{year}</span>
            </div>
          )}
        </div>
      </div>
    )
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    release_date: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
  }),
};

export default MovieCard;

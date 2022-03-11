import React from 'react';
import { capitalize, extractYear, minutesToHours } from '@src/utils/helpers';

import { MovieDetailsProps } from './MovieDetails.types';
import styles from './MovieDetails.module.scss';
import Poster from '../Poster/Poster';
import Title from '../Title/Title';

const MovieDetails = ({ onClick, movie }: MovieDetailsProps) => {
  const { title, vote_average, release_date, poster_path, overview, genres, runtime } = movie;
  const genreLine = genres.map(capitalize).join(' & ');
  const year = extractYear(release_date);
  const duration = minutesToHours(runtime);

  return (
    <div className={styles.view}>
      <div className={styles.header}>
        <Title />
        <button type="button" className={styles.header__search} onClick={onClick}>
          <svg
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18.5" cy="10.5" r="9.5" stroke="#F65261" strokeWidth="2" />
            <path d="M10.5 19.5L1.5 28.5" stroke="#F65261" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </button>
      </div>
      <div className={styles.content}>
        <Poster url={poster_path} className={styles.poster} />
        <div>
          <div className={styles.info__head}>
            <div className={styles.info__title}>
              {title}
              <span className={styles.info__rating}>{vote_average}</span>
            </div>
            <div className={styles.info__genres}>{genreLine}</div>
          </div>
          <div className={styles.info__digits}>
            <span>{year}</span>
            <span>{duration}</span>
          </div>
          <p className={styles.info__overview}>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

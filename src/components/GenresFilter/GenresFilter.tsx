import React from 'react';
import useRequest from '@src/hooks/useRequest';
import { GENRE_FILTERS } from '@src/utils/constants';
import { GenreQueries } from '@src/types/';
import styles from './GenresFilter.module.scss';

import GenreButton from './GenreButton/GenreButton';

const GenresFilter = () => {
  const [{ genre: selected }, doRequest] = useRequest();

  const handleGenreChange = (genre: GenreQueries) => {
    if (selected === genre) {
      return;
    }
    doRequest({ genre });
  };

  return (
    <div className={styles.genreButtons}>
      {GENRE_FILTERS.map((genre) => (
        <GenreButton
          key={genre}
          onClick={handleGenreChange}
          active={selected === genre}
          genre={genre}
        />
      ))}
    </div>
  );
};

export default GenresFilter;

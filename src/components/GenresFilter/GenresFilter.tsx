import React from 'react';
import useUpdateMovies from '@src/hooks/useUpdateMovies';
import { GENRE_FILTERS } from '@src/utils/constants';
import { GenreQueries } from '@src/types/';
import styles from './GenresFilter.module.scss';

import GenreButton from './GenreButton/GenreButton';

const GenresFilter = () => {
  const { genre: selected, updateMovies } = useUpdateMovies();

  const handleGenreChange = (genre: GenreQueries) => {
    if (selected === genre) {
      return;
    }
    updateMovies({ genre });
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

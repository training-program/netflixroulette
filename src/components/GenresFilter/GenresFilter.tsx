import React, { memo } from 'react';
import { GENRE_FILTERS } from '@src/utils/constants';
import { GenreQueries } from '@src/types/';
import styles from './GenresFilter.module.scss';
import { GenreFilterProps } from './GenresFilter.types';

import GenreButton from './GenreButton/GenreButton';

const GenresFilter = ({ selected, onChange }: GenreFilterProps) => {
  const handleGenreChange = (genre: GenreQueries) => {
    if (selected === genre) {
      return;
    }
    onChange((prevParams) => ({ ...prevParams, genre }));
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

export default memo(GenresFilter);

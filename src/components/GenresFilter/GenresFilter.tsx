import React from 'react';
import { NAV_GENRES } from '@src/utils/constants';
import { GenreFilters } from '@src/types/';
import { GenreFilterProps } from './GenresFilter.types';
import styles from './GenresFilter.module.scss';

import GenreButton from './GenreButton/GenreButton';

const GenresFilter = ({ onChange, selected }: GenreFilterProps) => {
  const handleGenreChange = (genre: GenreFilters) => {
    if (selected === genre) {
      return;
    }
    onChange(genre);
  };

  return (
    <div className={styles.genreButtons}>
      {NAV_GENRES.map((genre) => (
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

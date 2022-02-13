import * as React from 'react';
import { NAV_GENRES } from '@src/utils/constants';
import { NavGenres } from '@src/types/';
import styles from './GenresFilter.module.scss';

import GenreButton from './GenreButton/GenreButton';

type Props = {
  onChange: React.Dispatch<React.SetStateAction<NavGenres>>;
  selected: NavGenres;
};

const GenresFilter = ({ onChange, selected }: Props) => {
  const handleGenreChange = (genre: NavGenres) => {
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

import React from 'react';
import { GENRE_FILTERS } from '@src/utils/constants';
import { GenreQueries } from '@src/types/';
import { connect } from 'react-redux';
import { fetchMovies } from '@src/store/actionCreators/movies';
import { RootState } from '@src/store';
import { GenreFilterProps } from './GenresFilter.types';
import styles from './GenresFilter.module.scss';

import GenreButton from './GenreButton/GenreButton';

const GenresFilter = ({ selected, filterMovies }: GenreFilterProps) => {
  const handleGenreChange = (genre: GenreQueries) => {
    if (selected === genre) {
      return;
    }
    filterMovies({ genre });
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

const mapStateToProps = ({
  movies: {
    requestParams: { genre: selected },
  },
}: RootState) => ({ selected });

const mapDispatchToProps = { filterMovies: fetchMovies };

export default connect(mapStateToProps, mapDispatchToProps)(GenresFilter);

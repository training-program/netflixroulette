import React from 'react';
import { GENRE_FILTERS } from '@src/utils/constants';
import { GenreQueries, RootState } from '@src/types/';
import { connect } from 'react-redux';
import { fetchMovies } from '@src/store/actionCreators/movies';
import { selectGenre } from '@src/store/selectors/movies.selectors';
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

const mapStateToProps = (state: RootState) => ({ selected: selectGenre(state) });

const mapDispatchToProps = { filterMovies: fetchMovies };

export default connect(mapStateToProps, mapDispatchToProps)(GenresFilter);

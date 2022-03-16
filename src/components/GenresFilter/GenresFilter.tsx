import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRE_FILTERS } from '@src/utils/constants';
import { GenreQueries, RootState } from '@src/types/';
import { connect } from 'react-redux';
import { selectGenre } from '@src/store/selectors/movies.selectors';
import { GenreFilterProps } from './GenresFilter.types';
import styles from './GenresFilter.module.scss';

import GenreButton from './GenreButton/GenreButton';

const GenresFilter = ({ selected }: GenreFilterProps) => {
  const navigate = useNavigate();

  const handleGenreChange = (genre: GenreQueries) => {
    if (selected !== genre) {
      navigate(`?genre=${genre}`);
    }
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

export default connect(mapStateToProps)(GenresFilter);

import React, { useState, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { RootState } from '@src/types';
import { selectMovies, selectStatus } from '@src/store/selectors/movies.selectors';
import { ResultsBodyProps } from './ResultBody.types';
import styles from './ResultsBody.module.scss';

import MovieCard from './MovieCard/MovieCard';
import ContextMenu from './ContextMenu/ContextMenu';
import Spinner from '../Spinner/Spinner';

const ResultsBody = ({ loading, error, movies }: ResultsBodyProps) => {
  const [contextMenu, setContextMenu] = useState({
    showMenu: false,
    coordinateX: 0,
    coordinateY: 0,
    id: 0,
  });

  const handleOpenMenu = (event: MouseEvent<HTMLDivElement>, id: number) => {
    event.preventDefault();
    setContextMenu({
      showMenu: true,
      coordinateX: event.pageX,
      coordinateY: event.pageY,
      id,
    });
  };

  const handleCloseMenu = () => {
    setContextMenu({
      showMenu: false,
      coordinateX: 0,
      coordinateY: 0,
      id: 0,
    });
  };

  const { showMenu, coordinateX, coordinateY, id } = contextMenu;

  return loading ? (
    <Spinner />
  ) : (
    <>
      {error ? (
        <span className={styles.error}>Oops, something went wrong, the movies not found...</span>
      ) : (
        <div className={styles.resultCount}>
          <b className={styles.resultCount__digit}>{String(movies.length)}</b>
          {` movie${movies.length === 1 ? '' : 's'} found`}
        </div>
      )}
      <div className={styles.movieList} data-test="movie-list">
        {movies.map(({ id: movieId, title, tagline, release_date, poster_path }) => (
          <MovieCard
            key={movieId}
            id={movieId}
            title={title}
            tagline={tagline}
            release_date={release_date}
            poster_path={poster_path}
            onContextMenu={handleOpenMenu}
          />
        ))}
        {showMenu && (
          <ContextMenu
            onClose={handleCloseMenu}
            coordinateX={coordinateX}
            coordinateY={coordinateY}
            id={id}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  movies: selectMovies(state),
  loading: selectStatus(state).loading,
  error: selectStatus(state).error,
});

export default connect(mapStateToProps)(ResultsBody);

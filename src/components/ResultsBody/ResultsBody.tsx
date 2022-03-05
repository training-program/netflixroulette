import React, { useState, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@src/store';
import styles from './ResultsBody.module.scss';

import MovieCard from './MovieCard/MovieCard';
import ContextMenu from './ContextMenu/ContextMenu';
import Spinner from '../Spinner/Spinner';

const connector = connect(
  ({
    movies: {
      movies,
      status: { loading, error },
    },
  }: RootState) => ({ movies, loading, error }),
);

const ResultsBody = ({ loading, error, movies }: ConnectedProps<typeof connector>) => {
  const [state, setShowMenu] = useState({
    showMenu: false,
    coordinateX: 0,
    coordinateY: 0,
  });

  const handleOpenMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowMenu({
      showMenu: true,
      coordinateX: event.pageX,
      coordinateY: event.pageY,
    });
  };

  const handleCloseMenu = () => {
    setShowMenu({
      showMenu: false,
      coordinateX: 0,
      coordinateY: 0,
    });
  };

  const { showMenu, coordinateX, coordinateY } = state;

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
      <div className={styles.movieList}>
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
          />
        )}
      </div>
    </>
  );
};

export default connector(ResultsBody);

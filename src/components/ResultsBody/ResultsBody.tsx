import React, { useState, useContext, memo, MouseEvent, useEffect } from 'react';
import useUpdateMovies from '@src/hooks/useUpdateMovies';
import { AppContext } from '@src/context/app.context';
import { ResultsBodyProps } from './ResultsBody.types';
import styles from './ResultsBody.module.scss';

import MovieCard from './MovieCard/MovieCard';
import ContextMenu from './ContextMenu/ContextMenu';
import Spinner from '../Spinner/Spinner';

const ResultsBody = ({ setCurrentId }: ResultsBodyProps) => {
  const {
    status: { loading, error },
    updateMovies,
  } = useUpdateMovies();
  useEffect(() => updateMovies(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const { movies } = useContext(AppContext);

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
            setCurrentId={setCurrentId}
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

export default memo(ResultsBody);

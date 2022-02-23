import React, { useState, memo, MouseEvent, useEffect } from 'react';
import useRequest from '@src/hooks/useRequest';
import { AppContext } from '@src/context/app.context';
import { ResultsBodyProps } from './ResultsBody.types';
import styles from './ResultsBody.module.scss';

import MovieCard from './MovieCard/MovieCard';
import ContextMenu from './ContextMenu/ContextMenu';
import Spinner from '../Spinner/Spinner';

const ResultsBody = ({ onOpenEdit, onOpenDelete, onOpenView, setCurrentId }: ResultsBodyProps) => {
  const [{ loading, error }, doRequest] = useRequest();
  useEffect(() => doRequest(), []); // eslint-disable-line react-hooks/exhaustive-deps

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
    <AppContext.Consumer>
      {({ movies }) => (
        <>
          {error ? (
            <span className={styles.error}>
              Oops, something went wrong, the movies not found...
            </span>
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
                onClick={onOpenView}
              />
            ))}
            {showMenu && (
              <ContextMenu
                onClose={handleCloseMenu}
                coordinateX={coordinateX}
                coordinateY={coordinateY}
                onOpenEdit={onOpenEdit}
                onOpenDelete={onOpenDelete}
              />
            )}
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
};

export default memo(ResultsBody);

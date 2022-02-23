import React, { useState, memo, MouseEvent } from 'react';
import MoviesContext from '@src/context/movies.context';
import { ResultsBodyProps } from './ResultsBody.types';
import styles from './ResultsBody.module.scss';

import MovieCard from './MovieCard/MovieCard';
import ContextMenu from './ContextMenu/ContextMenu';
import Spinner from '../Spinner/Spinner';

const ResultsBody = ({
  showLoader,
  onOpenEdit,
  onOpenDelete,
  onOpenView,
  setCurrentId,
}: ResultsBodyProps) => {
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

  return showLoader ? (
    <Spinner />
  ) : (
    <MoviesContext.Consumer>
      {({ movies }) => (
        <>
          <div className={styles.resultCount}>
            <b className={styles.resultCount__digit}>{String(movies.length)}</b>
            {` movie${movies.length === 1 ? '' : 's'} found`}
          </div>
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
    </MoviesContext.Consumer>
  );
};

export default memo(ResultsBody);

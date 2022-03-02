import React, { useState, useMemo, Suspense, lazy, useCallback, useEffect } from 'react';
import {
  STATUSES,
  ADD_FORM,
  DEFAULT_MOVIE,
  EDIT_FORM,
  GENRE_FILTERS,
  SORT_BY,
} from '@src/utils/constants';
import AppContext from './context/app.context';
import { Movie, RequestParameters } from './types';
import API from './api/api';

import styles from './App.module.scss';

import Header from './components/Header/Header';
import MovieDetails from './components/MovieDetails/MovieDetails';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Spinner from './components/Spinner/Spinner';
import GenresFilter from './components/GenresFilter/GenresFilter';
import Sorting from './components/Sorting/Sorting';
import Title from './components/Title/Title';

const ResultsBody = lazy(() => import('./components/ResultsBody/ResultsBody'));
const DeleteForm = lazy(() => import('./components/DeleteForm/DeleteForm'));
const EditorForm = lazy(() => import('./components/EditorForm/EditorForm'));

const { INITIAL, LOADING, SUCCESS, ERROR } = STATUSES;

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState(INITIAL);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [requestParameters, setRequestParameters] = useState<RequestParameters>({
    genre: GENRE_FILTERS[0],
    sortBy: SORT_BY[0],
    query: '',
  });

  const { genre, sortBy, query } = requestParameters;

  useEffect(() => {
    setStatus(LOADING);
    API.getAll(genre, sortBy, query)
      .then((response) => {
        setMovies(response);
        setRequestParameters({ genre, sortBy, query });
        setStatus(SUCCESS);
      })
      .catch((error: Error) => {
        setStatus(ERROR);
        console.error(error); // eslint-disable-line
      });
  }, [genre, sortBy, query]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  const handleCloseAdd = useCallback(() => setShowAdd(false), []);
  const handleCloseEdit = useCallback(() => setShowEdit(false), []);
  const handleCloseDelete = useCallback(() => setShowDelete(false), []);
  const handleCloseMovieDetails = useCallback(() => setShowMovieDetails(false), []);
  const handleAddMovie = useCallback(
    (movie) => setMovies((prevMovies) => [movie, ...prevMovies]),
    [],
  );
  const handleEditMovie = useCallback(
    (movieOrId) => {
      setMovies((prevMovies) => {
        const isDelete = typeof movieOrId === 'number';
        const id = isDelete ? movieOrId : movieOrId.id;
        const index = prevMovies.findIndex((movie) => movie.id === id);

        if (index === -1) {
          console.error(`Movie with id '${id}' not found`); // eslint-disable-line
          return prevMovies;
        }

        const moviesCopy = [...movies];

        if (isDelete) {
          moviesCopy.splice(index, 1);
          setShowMovieDetails(false);
        } else {
          moviesCopy.splice(index, 1, movieOrId);
        }

        return moviesCopy;
      });
    },
    [movies],
  );

  const hasCurrentId = typeof currentId === 'number';
  let currentMovie = DEFAULT_MOVIE;

  if (hasCurrentId && (showEdit || showMovieDetails)) {
    currentMovie = movies.find((item) => item.id === currentId) || DEFAULT_MOVIE;
  }

  const context = useMemo(
    () => ({
      setCurrentId,
      setShowAdd,
      setShowEdit,
      setShowDelete,
      setShowMovieDetails,
    }),
    [],
  );

  return (
    <AppContext.Provider value={context}>
      <ErrorBoundary>
        {showMovieDetails && hasCurrentId && currentMovie.title ? (
          <MovieDetails onClick={handleCloseMovieDetails} movie={currentMovie} />
        ) : (
          <Header query={query} onChange={setRequestParameters} />
        )}
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Spinner fullscreen />}>
          {showAdd && (
            <EditorForm
              movie={currentMovie}
              onClose={handleCloseAdd}
              onSubmit={handleAddMovie}
              variant={ADD_FORM}
            />
          )}
          {showEdit && (
            <EditorForm
              movie={currentMovie}
              onClose={handleCloseEdit}
              onSubmit={handleEditMovie}
              variant={EDIT_FORM}
            />
          )}
          {showDelete && hasCurrentId && (
            <DeleteForm
              deletedMovieId={currentId}
              onClose={handleCloseDelete}
              onSubmit={handleEditMovie}
            />
          )}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <section className={styles.container}>
            <div className={styles.controlsBar}>
              <GenresFilter selected={genre} onChange={setRequestParameters} />
              <Sorting selected={sortBy} onChange={setRequestParameters} />
            </div>
            <hr className={styles.hr} />
            <ResultsBody status={status} movies={movies} />
          </section>
          <footer className={styles.footer}>
            <Title />
          </footer>
        </Suspense>
      </ErrorBoundary>
    </AppContext.Provider>
  );
};

export default App;

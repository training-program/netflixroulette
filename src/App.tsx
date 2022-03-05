import React, { useState, useMemo, Suspense, lazy, useCallback, useEffect } from 'react';
import { ADD_FORM, DEFAULT_MOVIE, EDIT_FORM } from '@src/utils/constants';
import { connect, ConnectedProps } from 'react-redux';
import AppContext from './context/app.context';
import { RootState } from './store';
import { createMovie, fetchMovies, updateMovie } from './store/actionCreators/movies';

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

const connector = connect(({ movies: { movies } }: RootState) => ({ movies }), {
  getMovies: fetchMovies,
  addMovie: createMovie,
  editMovie: updateMovie,
});

const App = ({ getMovies, addMovie, editMovie, movies }: ConnectedProps<typeof connector>) => {
  useEffect(() => getMovies(), [getMovies]);

  const [activeMovieId, setActiveMovieId] = useState<number | null>(null);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseAdd = useCallback(() => setShowAdd(false), []);
  const handleCloseEdit = useCallback(() => setShowEdit(false), []);
  const handleCloseDelete = useCallback(() => setShowDelete(false), []);
  const handleCloseMovieDetails = useCallback(() => setEditingMovieId(null), []);

  const hasActiveMovieId = typeof activeMovieId === 'number';
  const hasEditingMovieId = typeof editingMovieId === 'number';

  const activeMovie = hasActiveMovieId && movies.find(({ id }) => id === activeMovieId);
  const editingMovie = hasEditingMovieId && movies.find(({ id }) => id === editingMovieId);

  const context = useMemo(
    () => ({
      setActiveMovieId,
      setEditingMovieId,
      setShowAdd,
      setShowEdit,
      setShowDelete,
    }),
    [],
  );

  return (
    <AppContext.Provider value={context}>
      <ErrorBoundary>
        {activeMovie ? (
          <MovieDetails onClick={handleCloseMovieDetails} movie={activeMovie} />
        ) : (
          <Header />
        )}
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Spinner fullscreen />}>
          {showAdd && (
            <EditorForm
              movie={DEFAULT_MOVIE}
              onSubmit={addMovie}
              onClose={handleCloseAdd}
              variant={ADD_FORM}
            />
          )}
          {showEdit && editingMovie && (
            <EditorForm
              movie={editingMovie}
              onSubmit={editMovie}
              onClose={handleCloseEdit}
              variant={EDIT_FORM}
            />
          )}
          {showDelete && editingMovie && (
            <DeleteForm deletedMovieId={editingMovie.id} onClose={handleCloseDelete} />
          )}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <section className={styles.container}>
            <div className={styles.controlsBar}>
              <GenresFilter />
              <Sorting />
            </div>
            <hr className={styles.hr} />
            <ResultsBody />
          </section>
          <footer className={styles.footer}>
            <Title />
          </footer>
        </Suspense>
      </ErrorBoundary>
    </AppContext.Provider>
  );
};

export default connector(App);

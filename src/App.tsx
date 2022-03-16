import React, { useState, useMemo, Suspense, lazy, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ADD_FORM, DEFAULT_MOVIE, EDIT_FORM } from '@src/utils/constants';
import { connect } from 'react-redux';
import AppContext from './context/app.context';
import { RequestParams, RootState, SEARCH_PARAMS } from './types';
import { createMovie, deleteMovie, fetchMovies, updateMovie } from './store/actionCreators/movies';
import { selectMovies } from './store/selectors/movies.selectors';
import { AppProps } from './App.types';
import { isGenreString, isSortByString } from './utils/helpers';

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

const { MOVIE, QUERY, GENRE, SORT_BY } = SEARCH_PARAMS;

const App = ({ getMovies, addMovie, editMovie, removeMovie, movies }: AppProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(QUERY);
  const genre = searchParams.get(GENRE);
  const sortBy = searchParams.get(SORT_BY);
  const activeMovieId = searchParams.get(MOVIE);

  useEffect(() => {
    const requestParams: Partial<RequestParams> = {};

    if (query) {
      requestParams.query = query;
    }

    if (isGenreString(genre)) {
      requestParams.genre = genre;
    }

    if (isSortByString(sortBy)) {
      requestParams.sortBy = sortBy;
    }

    getMovies(requestParams);
  }, [query, genre, sortBy, getMovies]);

  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseAdd = useCallback(() => setShowAdd(false), []);
  const handleCloseEdit = useCallback(() => setShowEdit(false), []);
  const handleCloseDelete = useCallback(() => setShowDelete(false), []);
  const handleCloseMovieDetails = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(MOVIE);
    setSearchParams(newParams);
  }, [setSearchParams, searchParams]);

  const hasEditingMovieId = typeof editingMovieId === 'number';

  const activeMovie = activeMovieId && movies.find(({ id }) => id === Number(activeMovieId));
  const editingMovie = hasEditingMovieId && movies.find(({ id }) => id === editingMovieId);

  const context = useMemo(
    () => ({
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
            <DeleteForm
              deletedMovieId={editingMovie.id}
              onClose={handleCloseDelete}
              onSubmit={removeMovie}
            />
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

const mapStateToProps = (state: RootState) => ({ movies: selectMovies(state) });

const mapDispatchToProps = {
  getMovies: fetchMovies,
  addMovie: createMovie,
  editMovie: updateMovie,
  removeMovie: deleteMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

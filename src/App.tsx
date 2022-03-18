import React, { Suspense, lazy, useCallback, useEffect } from 'react';
import { Routes, Route, useSearchParams, Navigate, useLocation } from 'react-router-dom';
import { ADD_FORM, EDIT_FORM } from '@src/utils/constants';
import { connect } from 'react-redux';
import { RequestParams, RootState, SEARCH_PARAMS } from './types';
import { createMovie, deleteMovie, fetchMovies, updateMovie } from './store/actionCreators/movies';
import { selectMovies } from './store/selectors/movies.selectors';
import { AppProps, LocationState } from './App.types';
import { isGenreString, isSortByString } from './utils/helpers';

import styles from './App.module.scss';

import Header from './components/Header/Header';
import MovieDetails from './components/MovieDetails/MovieDetails';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Spinner from './components/Spinner/Spinner';
import GenresFilter from './components/GenresFilter/GenresFilter';
import Sorting from './components/Sorting/Sorting';
import Title from './components/Title/Title';
import NoMatch from './components/NoMatch/NoMatch';

const ResultsBody = lazy(() => import('./components/ResultsBody/ResultsBody'));
const DeleteForm = lazy(() => import('./components/DeleteForm/DeleteForm'));
const EditorForm = lazy(() => import('./components/EditorForm/EditorForm'));

const App = ({ getMovies, addMovie, editMovie, removeMovie, movies }: AppProps) => {
  const location = useLocation();
  const state = location.state as LocationState;
  const backgroundLocation = state?.backgroundLocation;

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SEARCH_PARAMS.QUERY);
  const genre = searchParams.get(SEARCH_PARAMS.GENRE);
  const sortBy = searchParams.get(SEARCH_PARAMS.SORT_BY);
  const activeMovieId = searchParams.get(SEARCH_PARAMS.MOVIE);

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

  const handleCloseMovieDetails = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(SEARCH_PARAMS.MOVIE);
    setSearchParams(newParams);
  }, [setSearchParams, searchParams]);

  const activeMovie = activeMovieId && movies.find(({ id }) => id === Number(activeMovieId));

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route
          path="/search"
          element={
            <ErrorBoundary>
              {activeMovie ? (
                <MovieDetails onClick={handleCloseMovieDetails} movie={activeMovie} />
              ) : (
                <Header />
              )}
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
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="/movie">
            <Route
              path="add"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Spinner fullscreen />}>
                    <EditorForm onSubmit={addMovie} variant={ADD_FORM} />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Spinner fullscreen />}>
                    <EditorForm onSubmit={editMovie} variant={EDIT_FORM} />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="delete/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Spinner fullscreen />}>
                    <DeleteForm onSubmit={removeMovie} />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Route>
        </Routes>
      )}
    </>
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

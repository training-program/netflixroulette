import React, { Suspense, lazy, useCallback, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { RequestParams, SEARCH_PARAMS } from './types';
import { fetchMovies } from './store/actionCreators/movies';
import { selectMovies } from './store/selectors/movies.selectors';
import { hasGenre, hasSortBy } from './utils/helpers';
import { useAppDispatch, useAppSelector } from './hooks/redux';

import styles from './App.module.scss';

import Header from './components/Header/Header';
import MovieDetails from './components/MovieDetails/MovieDetails';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Spinner from './components/Spinner/Spinner';
import GenresFilter from './components/GenresFilter/GenresFilter';
import Sorting from './components/Sorting/Sorting';
import Title from './components/Title/Title';

const ResultsBody = lazy(() => import('./components/ResultsBody/ResultsBody'));

const App = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
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

    if (hasGenre(genre)) {
      requestParams.genre = genre;
    }

    if (hasSortBy(sortBy)) {
      requestParams.sortBy = sortBy;
    }

    dispatch(fetchMovies(requestParams));
  }, [dispatch, query, genre, sortBy]);

  const handleCloseMovieDetails = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(SEARCH_PARAMS.MOVIE);
    setSearchParams(newParams);
  }, [setSearchParams, searchParams]);

  const activeMovie = activeMovieId && movies.find(({ id }) => id === Number(activeMovieId));

  return (
    <>
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
      <Outlet />
    </>
  );
};

export default App;

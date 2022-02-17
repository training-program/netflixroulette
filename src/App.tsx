import React, {
  useState, useEffect, useMemo, Suspense, lazy, useCallback,
} from 'react';
import { NAV_GENRES, SORT_BY } from './utils/constants';
import API from './api/api';
import { Movie } from './types';
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
const ModalError = lazy(() => import('./components/ModalError/ModalError'));

const fetchAdd = API.add.bind(API);
const fetchEdit = API.edit.bind(API);
const fetchDelete = API.delete.bind(API);

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [showError, setShowError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState(NAV_GENRES[0]);
  const [sortBy, setSortBy] = useState(SORT_BY[0]);

  const handleToggleAdd = useCallback(() => setShowAdd((show) => !show), []);
  const handleToggleEdit = useCallback(() => setShowEdit((show) => !show), []);
  const handleToggleDelete = useCallback(() => setShowDelete((show) => !show), []);
  const handleOpenView = useCallback(() => setShowView(true), []);
  const handleCloseView = useCallback(() => setShowView(false), []);
  const handleCloseModalError = useCallback(() => setShowError(false), []);

  const addMovie = (movie: Movie) => {
    setMovies((state) => [movie, ...state]);
  };

  const editMovie = (updatedMovie?: Movie) => {
    const index = movies.findIndex(({ id }) => id === currentId);
    const moviesCopy = [...movies];

    if (index === -1) {
      setShowError(true);
    }

    const isDelete = !updatedMovie;

    if (isDelete) {
      moviesCopy.splice(index, 1);
    } else {
      moviesCopy.splice(index, 1, updatedMovie);
    }

    setMovies(moviesCopy);
  };

  useEffect(() => {
    setShowLoader(true);
    API.getAll(genre, sortBy, query)
      .then((response) => {
        setMovies(response);
        setShowLoader(false);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
        setShowError(true);
        setShowLoader(false);
      });
  }, [query, genre, sortBy]);

  const currentMovie = useMemo(
    () => (currentId ? movies.find((movie) => movie.id === currentId) : undefined),
    [currentId, movies],
  );

  return (
    <>
      <ErrorBoundary>
        {showView ? (
          <MovieDetails movie={currentMovie} onClick={handleCloseView} />
        ) : (
          <Header onOpenAdd={handleToggleAdd} onSubmit={setQuery} query={query} />
        )}
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Spinner fullscreen />}>
          {showAdd && (
            <EditorForm
              formName="Add movie"
              onClose={handleToggleAdd}
              onSubmit={addMovie}
              fetchApi={fetchAdd}
            />
          )}
          {showEdit && (
            <EditorForm
              formName="Edit movie"
              onClose={handleToggleEdit}
              onSubmit={editMovie}
              fetchApi={fetchEdit}
              movie={currentMovie}
            />
          )}
          {showDelete && (
            <DeleteForm
              onClose={handleToggleDelete}
              onSubmit={editMovie}
              fetchApi={fetchDelete}
              id={currentId}
            />
          )}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <section className={styles.container}>
            <div className={styles.controlsBar}>
              <GenresFilter onChange={setGenre} selected={genre} />
              <Sorting onChange={setSortBy} selected={sortBy} />
            </div>
            <hr className={styles.hr} />
            <ResultsBody
              showLoader={showLoader}
              movies={movies}
              onOpenEdit={handleToggleEdit}
              onOpenDelete={handleToggleDelete}
              onOpenView={handleOpenView}
              setCurrentId={setCurrentId}
            />
          </section>
          <footer className={styles.footer}>
            <Title />
          </footer>

          {showError && <ModalError onClose={handleCloseModalError} />}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;

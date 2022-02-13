import React, {
  useState,
  useReducer,
  useEffect,
  useMemo,
  Suspense,
  lazy,
  useCallback,
} from 'react';
import { NAV_GENRES, SORT_BY } from './utils/constants';
import { Movie } from './types';
import API from './api/api';
import styles from './App.module.scss';

import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner/Spinner';
import GenresFilter from './components/GenresFilter/GenresFilter';
import Sorting from './components/Sorting/Sorting';
import Title from './components/Title/Title';

const ResultsBody = lazy(() => import('./components/ResultsBody/ResultsBody'));
const DeleteForm = lazy(() => import('./components/DeleteForm/DeleteForm'));
const EditorForm = lazy(() => import('./components/EditorForm/EditorForm'));
const ModalError = lazy(() => import('./components/ModalError/ModalError'));
const MovieDetails = lazy(() => import('./components/MovieDetails/MovieDetails'));

const fetchAdd = API.add.bind(API);
const fetchEdit = API.edit.bind(API);
const fetchDelete = API.delete.bind(API);

enum ActionType {
  Add,
  Edit,
  Delete,
  Update,
}

type AddAction = { type: ActionType.Add; payload: { movie: Movie } };
type EditAction = { type: ActionType.Edit; payload: { movie: Movie; id: number } };
type DeleteAction = { type: ActionType.Delete; payload: { id: number } };
type UpdateAction = { type: ActionType.Update; payload: { movies: Movie[] } };

type Action = AddAction | EditAction | DeleteAction | UpdateAction;

const movieReducer = (movies: Movie[], action: Action): Movie[] => {
  if (action.type === ActionType.Update) {
    return action.payload.movies;
  }

  if (action.type === ActionType.Add) {
    return [action.payload.movie, ...movies];
  }

  const index = movies.findIndex((movie) => movie.id === action.payload.id);
  const moviesCopy = [...movies];

  switch (action.type) {
    case ActionType.Edit: {
      moviesCopy.splice(index, 1, action.payload.movie);
      return moviesCopy;
    }
    case ActionType.Delete: {
      moviesCopy.splice(index, 1);
      return moviesCopy;
    }
    default: {
      return movies;
    }
  }
};

const App = () => {
  const [movies, dispatchMovies] = useReducer(movieReducer, []);
  const [currentId, setCurrentId] = useState<number>(null!);

  const [showError, setShowError] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState(NAV_GENRES[0]);
  const [sortBy, setSortBy] = useState(SORT_BY[0]);

  const handleToggleAdd = useCallback(() => setShowAdd((show) => !show), []);
  const handleToggleEdit = useCallback(() => setShowEdit((show) => !show), []);
  const handleToggleDelete = useCallback(() => setShowDelete((show) => !show), []);
  const handleOpenView = useCallback(() => setShowView(true), []);
  const handleCloseModalError = useCallback(() => setShowError(false), []);
  const handleCloseHeader = useCallback(() => setShowHeader(false), []);
  const handleCloseView = useCallback(() => {
    setShowView(false);
    setShowHeader(true);
  }, []);

  const setError = (error: string) => {
    console.error(error); // eslint-disable-line
    setShowError(true);
    setShowLoader(false);
  };

  const addMovie = (movie: Movie) => {
    dispatchMovies({ type: ActionType.Add, payload: { movie } });
  };

  const editMovie = (movie: Movie) => {
    dispatchMovies({ type: ActionType.Edit, payload: { movie, id: currentId } });
  };

  const deleteMovie = () => {
    if (showView) {
      setShowView(false);
    }
    dispatchMovies({ type: ActionType.Delete, payload: { id: currentId } });
  };

  useEffect(() => {
    setShowLoader(true);
    API.getAll(genre, sortBy, query)
      .then((response) => {
        dispatchMovies({ type: ActionType.Update, payload: { movies: response } });
        setShowLoader(false);
      })
      .catch(setError);
  }, [query, genre, sortBy]);

  const currentMovie = useMemo(
    () => (currentId ? movies.find((movie) => movie.id === currentId) : undefined),
    [currentId, movies],
  );

  return (
    <>
      <ErrorBoundary>
        {showView && (
          <Suspense fallback={<Spinner fullscreen />}>
            <MovieDetails
              movie={currentMovie}
              onClick={handleCloseView}
              onMount={handleCloseHeader}
            />
          </Suspense>
        )}
        {showHeader && <Header onOpenAdd={handleToggleAdd} onSubmit={setQuery} query={query} />}
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
              onSubmit={deleteMovie}
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

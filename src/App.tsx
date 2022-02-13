import React, {
  useState, useReducer, useEffect, Suspense, lazy, useCallback,
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

const ResultsBody = lazy(() => import('./components/ResultsBody/ResultsBody'));
const DeleteForm = lazy(() => import('./components/DeleteForm/DeleteForm'));
const EditorForm = lazy(() => import('./components/EditorForm/EditorForm'));
const ModalError = lazy(() => import('./components/ModalError/ModalError'));

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
  const [movies, dispatch] = useReducer(movieReducer, []);
  const [currentId, setCurrentId] = useState<number>(null!);

  const [showError, setShowError] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState(NAV_GENRES[0]);
  const [sortBy, setSortBy] = useState(SORT_BY[0]);

  const handleToggleAdd = useCallback(() => setShowAdd((show) => !show), []);
  const handleToggleEdit = useCallback(() => setShowEdit((show) => !show), []);
  const handleToggleDelete = useCallback(() => setShowDelete((show) => !show), []);
  const handleCloseModalError = useCallback(() => setShowError(false), []);

  const setError = (error: string) => {
    console.error(error); // eslint-disable-line
    setShowError(true);
    setShowLoader(false);
  };

  const addMovie = (movie: Movie) => {
    dispatch({ type: ActionType.Add, payload: { movie } });
  };

  const editMovie = (movie: Movie) => {
    dispatch({ type: ActionType.Edit, payload: { movie, id: currentId } });
  };

  const deleteMovie = () => {
    dispatch({ type: ActionType.Delete, payload: { id: currentId } });
  };

  useEffect(() => {
    setShowLoader(true);
    API.getAll(genre, sortBy, query)
      .then((response) => {
        dispatch({ type: ActionType.Update, payload: { movies: response } });
        setShowLoader(false);
      })
      .catch(setError);
  }, [query, genre, sortBy]);

  const currentMovie: Movie | undefined = currentId
    ? movies.find((movie) => movie.id === currentId)
    : undefined;

  return (
    <>
      <Header onOpenAdd={handleToggleAdd} onSubmit={setQuery} query={query} />
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
              setCurrentId={setCurrentId}
            />
          </section>
          <footer className={styles.footer}>
            <span className={styles.footer__title}>
              <b>netflix</b>
              roulette
            </span>
          </footer>

          {showError && <ModalError onClose={handleCloseModalError} />}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;

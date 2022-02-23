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
import API from './api/api';
import MoviesReducer from './reducers/movies.reducer';
import MoviesContext from './context/movies.context';
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

const App = () => {
  const [movies, dispatch] = useReducer(MoviesReducer, []);
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

  useEffect(() => {
    setShowLoader(true);
    API.getAll(genre, sortBy, query)
      .then((response) => {
        dispatch({ type: 'UPDATE', payload: response });
        setShowLoader(false);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
        setShowError(true);
        setShowLoader(false);
      });
  }, [query, genre, sortBy]);

  const context = useMemo(() => ({ dispatch, movies }), [movies]);
  const isId = typeof currentId === 'number';

  return (
    <MoviesContext.Provider value={context}>
      <ErrorBoundary>
        {showView && isId ? (
          <MovieDetails onClick={handleCloseView} id={currentId} />
        ) : (
          <Header onOpenAdd={handleToggleAdd} onSubmit={setQuery} query={query} />
        )}
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Spinner fullscreen />}>
          {showAdd && <EditorForm onClose={handleToggleAdd} formName="Add movie" action="ADD" />}
          {showEdit && isId && (
            <EditorForm
              onClose={handleToggleEdit}
              id={currentId}
              formName="Edit movie"
              action="EDIT"
            />
          )}
          {showDelete && isId && (
            <DeleteForm onClose={handleToggleDelete} id={currentId} onCloseView={handleCloseView} />
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
    </MoviesContext.Provider>
  );
};

export default App;

import React, { useState, useReducer, useMemo, Suspense, lazy, useCallback } from 'react';
import MoviesReducer from './reducers/movies.reducer';
import { AppContext, inititalRequestParameters, initialRequestStatus } from './context/app.context';
import { ADD_FORM, EDIT_FORM } from './utils/constants';
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

const App = () => {
  const [movies, dispatch] = useReducer(MoviesReducer, []);
  const [requestParameters, setRequestParameters] = useState(inititalRequestParameters);
  const [status, setStatus] = useState(initialRequestStatus);

  const [currentId, setCurrentId] = useState<number | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);

  const handleToggleAdd = useCallback(() => setShowAdd((show) => !show), []);
  const handleToggleEdit = useCallback(() => setShowEdit((show) => !show), []);
  const handleToggleDelete = useCallback(() => setShowDelete((show) => !show), []);
  const handleOpenView = useCallback(() => setShowView(true), []);
  const handleCloseView = useCallback(() => setShowView(false), []);

  const context = useMemo(
    () => ({
      dispatch,
      movies,
      setRequestParameters,
      requestParameters,
      status,
      setStatus,
    }),
    [movies, requestParameters, status],
  );
  const isId = typeof currentId === 'number';

  return (
    <AppContext.Provider value={context}>
      <ErrorBoundary>
        {showView && isId ? (
          <MovieDetails onClick={handleCloseView} id={currentId} />
        ) : (
          <Header onOpenAdd={handleToggleAdd} />
        )}
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Spinner fullscreen />}>
          {showAdd && <EditorForm onClose={handleToggleAdd} variant={ADD_FORM} />}
          {showEdit && isId && (
            <EditorForm onClose={handleToggleEdit} id={currentId} variant={EDIT_FORM} />
          )}
          {showDelete && isId && (
            <DeleteForm onClose={handleToggleDelete} id={currentId} onCloseView={handleCloseView} />
          )}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <section className={styles.container}>
            <div className={styles.controlsBar}>
              <GenresFilter />
              <Sorting />
            </div>
            <hr className={styles.hr} />
            <ResultsBody
              onOpenEdit={handleToggleEdit}
              onOpenDelete={handleToggleDelete}
              onOpenView={handleOpenView}
              setCurrentId={setCurrentId}
            />
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

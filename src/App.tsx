import React, { useState, Suspense, lazy, useContext } from 'react';
import { AppContext } from './context/app.context';
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
  const [currentId, setCurrentId] = useState<number | null>(null);
  const { showAdd, showEdit, showDelete, showMovieDetails } = useContext(AppContext);
  const hasCurrentId = typeof currentId === 'number';

  return (
    <>
      <ErrorBoundary>
        {showMovieDetails && hasCurrentId ? <MovieDetails id={currentId} /> : <Header />}
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Spinner fullscreen />}>
          {showAdd && <EditorForm variant={ADD_FORM} />}
          {showEdit && hasCurrentId && <EditorForm id={currentId} variant={EDIT_FORM} />}
          {showDelete && hasCurrentId && <DeleteForm deletedMovieId={currentId} />}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <section className={styles.container}>
            <div className={styles.controlsBar}>
              <GenresFilter />
              <Sorting />
            </div>
            <hr className={styles.hr} />
            <ResultsBody setCurrentId={setCurrentId} />
          </section>
          <footer className={styles.footer}>
            <Title />
          </footer>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;

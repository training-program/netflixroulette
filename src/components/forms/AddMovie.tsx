import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '@src/components/ErrorBoundary/ErrorBoundary';
import Spinner from '@src/components/Spinner/Spinner';
import { createMovie } from '@src/store/actionCreators/movies';
import { ADD_FORM } from '@src/utils/constants';

const EditorForm = lazy(() => import('../EditorForm/EditorForm'));

const AddMovie = () => (
  <ErrorBoundary>
    <Suspense fallback={<Spinner fullscreen />}>
      <EditorForm action={createMovie} variant={ADD_FORM} />
    </Suspense>
  </ErrorBoundary>
);

export default AddMovie;

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '@src/components/ErrorBoundary/ErrorBoundary';
import Spinner from '@src/components/Spinner/Spinner';
import { updateMovie } from '@src/store/actionCreators/movies';
import { EDIT_FORM } from '@src/utils/constants';

const EditorForm = lazy(() => import('../components/EditorForm/EditorForm'));

const AddMovie = () => (
  <ErrorBoundary>
    <Suspense fallback={<Spinner fullscreen />}>
      <EditorForm onSubmit={updateMovie} variant={EDIT_FORM} />
    </Suspense>
  </ErrorBoundary>
);

export default AddMovie;

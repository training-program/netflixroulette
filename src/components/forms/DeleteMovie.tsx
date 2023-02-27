import React, { Suspense, lazy } from 'react';
import ErrorBoundary from '@src/components/ErrorBoundary/ErrorBoundary';
import Spinner from '@src/components/Spinner/Spinner';

const DeleteForm = lazy(() => import('../DeleteForm/DeleteForm'));

const AddMovie = () => (
  <ErrorBoundary>
    <Suspense fallback={<Spinner fullscreen />}>
      <DeleteForm />
    </Suspense>
  </ErrorBoundary>
);

export default AddMovie;

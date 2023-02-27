import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  LoaderFunctionArgs,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import 'normalize.css';
import './index.scss';
import { PATHS } from './types';

import AddMovie from './components/forms/AddMovie';
import DeleteMovie from './components/forms/DeleteMovie';
import EditMovie from './components/forms/EditMovie';
import NoMatch from './components/NoMatch/NoMatch';

const loader = async ({ params }: LoaderFunctionArgs) => {
  const query = params.QUERY;
  const genre = params.GENRE;
  const sortBy = params.SORT_BY;
  const activeMovieId = params.MOVIE;

  return { query, genre, sortBy, activeMovieId };
};

const appRouter = createBrowserRouter([
  { path: PATHS.ROOT, loader: () => redirect(PATHS.SEARCH), errorElement: <NoMatch /> },
  {
    path: PATHS.SEARCH,
    element: <App />,
    loader,
    children: [
      { path: PATHS.MOVIE_ADD, element: <AddMovie /> },
      { path: PATHS.MOVIE_DELETE, element: <DeleteMovie /> },
      { path: PATHS.MOVIE_EDIT, element: <EditMovie /> },
    ],
  },
]);

createRoot(document.getElementById('netflixroulette-root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>,
);

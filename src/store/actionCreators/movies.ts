import API from '@src/api/api';
import { Movie, RequestParams } from '@src/types';
import { selectRequestParams, selectMovies } from '../selectors/movies.selectors';
import { actions } from '../reducers/moviesSlice';
import { AppDispatch, RootState } from '..';

export const fetchMovies =
  (params: Partial<RequestParams>) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(actions.fetchMovies(params));

    API.getAll(selectRequestParams(getState()))
      .then((movies) => dispatch(actions.fetchMoviesSuccess(movies)))
      .catch(() => dispatch(actions.fetchMoviesError()));
  };

export const createMovie = (movie: Movie) => (dispatch: AppDispatch) => {
  dispatch(actions.createMovie(movie));
};

export const updateMovie = (movie: Movie) => (dispatch: AppDispatch, getState: () => RootState) => {
  const movies = selectMovies(getState());
  const index = movies.findIndex(({ id }) => id === movie.id);
  const payload =
    index < 0 ? movies : [...movies.slice(0, index), movie, ...movies.slice(index + 1)];

  dispatch(actions.updateMovies(payload));
};

export const deleteMovie = (id: number) => (dispatch: AppDispatch, getState: () => RootState) => {
  const movies = selectMovies(getState());
  const payload = movies.filter((movie) => movie.id !== id);

  dispatch(actions.updateMovies(payload));
};

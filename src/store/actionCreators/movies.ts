import API from '@src/api/api';
import { Movie, RequestParams, RootState, MoviesAction, MoviesActionType } from '@src/types';
import { Dispatch } from 'redux';
import { selectRequestParams, selectMovies } from '../selectors/movies.selectors';

export const fetchMovies =
  (params?: Partial<RequestParams>) =>
  (dispatch: Dispatch<MoviesAction>, getState: () => RootState) => {
    dispatch({ type: MoviesActionType.FETCH_MOVIES, payload: params });

    API.getAll(selectRequestParams(getState()))
      .then((movies) => dispatch({ type: MoviesActionType.FETCH_MOVIES_SUCCESS, payload: movies }))
      .catch(() => dispatch({ type: MoviesActionType.FETCH_MOVIES_ERROR }));
  };

export const createMovie = (movie: Movie) => ({
  type: MoviesActionType.CREATE_MOVIE,
  payload: movie,
});

export const updateMovie =
  (movie: Movie) => (dispatch: Dispatch<MoviesAction>, getState: () => RootState) => {
    const movies = selectMovies(getState());
    const index = movies.findIndex(({ id }) => id === movie.id);

    dispatch({
      type: MoviesActionType.UPDATE_MOVIE,
      payload: index < 0 ? movies : [...movies.slice(0, index), movie, ...movies.slice(index + 1)],
    });
  };

export const deleteMovie =
  (id: number) => (dispatch: Dispatch<MoviesAction>, getState: () => RootState) => {
    const movies = selectMovies(getState());

    dispatch({
      type: MoviesActionType.DELETE_MOVIE,
      payload: movies.filter((movie) => movie.id !== id),
    });
  };

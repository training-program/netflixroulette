import API from '@src/api/api';
import { Movie, RequestParams } from '@src/types';
import { Dispatch } from 'redux';
import { RootState } from '..';
import { MoviesAction, MoviesActionType } from '../reducers/moviesReducer.types';

export const fetchMovies =
  (params?: Partial<RequestParams>) =>
  (dispatch: Dispatch<MoviesAction>, getState: () => RootState) => {
    dispatch({ type: MoviesActionType.FETCH_MOVIES, payload: params });

    API.getAll(getState().movies.requestParams)
      .then((movies) => dispatch({ type: MoviesActionType.FETCH_MOVIES_SUCCESS, payload: movies }))
      .catch(() => dispatch({ type: MoviesActionType.FETCH_MOVIES_ERROR }));
  };

export const createMovie = (movie: Movie) => ({
  type: MoviesActionType.CREATE_MOVIE,
  payload: movie,
});

export const updateMovie = (movie: Movie) => ({
  type: MoviesActionType.UPDATE_MOVIE,
  payload: movie,
});

export const deleteMovie = (id: number) => ({
  type: MoviesActionType.DELETE_MOVIE,
  payload: id,
});

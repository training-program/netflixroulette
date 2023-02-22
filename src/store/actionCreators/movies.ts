import API from '@src/api/api';
import { BaseMovie, RequestParams } from '@src/types';
import { selectRequestParams } from '../selectors/movies.selectors';
import { actions } from '../reducers/moviesSlice';
import { AppDispatch, RootState } from '..';

export const fetchMovies =
  (params: Partial<RequestParams>) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(actions.fetchMovies(params));

    API.getAll(selectRequestParams(getState()))
      .then((movies) => dispatch(actions.fetchMoviesSuccess(movies)))
      .catch(() => dispatch(actions.fetchMoviesError()));
  };

export const createMovie = (movie: BaseMovie) => (dispatch: AppDispatch) =>
  API.send('POST')
    .request(movie)
    .then((response) => {
      dispatch(actions.createMovie(response));
    });

export const updateMovie = (movie: BaseMovie) => (dispatch: AppDispatch) =>
  API.send('PUT')
    .request(movie)
    .then((response) => {
      dispatch(actions.updateMovie(response));
    });

export const deleteMovie = (id: number) => (dispatch: AppDispatch) =>
  API.delete.request(id).then(() => {
    dispatch(actions.deleteMovie(id));
  });

import { Movie, RequestParams, StatusContent } from '@src/types';

export type MoviesState = {
  movies: Movie[];
  status: StatusContent;
  requestParams: RequestParams;
};

export enum MoviesActionType {
  FETCH_MOVIES = 'FETCH_MOVIES',
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR',
  CREATE_MOVIE = 'CREATE_MOVIE',
  UPDATE_MOVIE = 'UPDATE_MOVIE',
  DELETE_MOVIE = 'DELETE_MOVIE',
}

type FetchMovies = {
  type: MoviesActionType.FETCH_MOVIES;
  payload?: Partial<RequestParams>;
};
type FetchMoviesSuccess = {
  type: MoviesActionType.FETCH_MOVIES_SUCCESS;
  payload: Movie[];
};
type FetchMoviesError = {
  type: MoviesActionType.FETCH_MOVIES_ERROR;
};
type CreateMovie = {
  type: MoviesActionType.CREATE_MOVIE;
  payload: Movie;
};
type UpdateMovie = {
  type: MoviesActionType.UPDATE_MOVIE;
  payload: Movie;
};
type DeleteMovie = {
  type: MoviesActionType.DELETE_MOVIE;
  payload: number;
};

export type MoviesAction =
  | FetchMovies
  | FetchMoviesSuccess
  | FetchMoviesError
  | CreateMovie
  | UpdateMovie
  | DeleteMovie;

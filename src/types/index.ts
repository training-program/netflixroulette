export enum Genre {
  'Action' = 'Action',
  'Adventure' = 'Adventure',
  'Animation' = 'Animation',
  'Comedy' = 'Comedy',
  'Crime' = 'Crime',
  'Documentary' = 'Documentary',
  'Drama' = 'Drama',
  'Family' = 'Family',
  'Fantasy' = 'Fantasy',
  'Horror' = 'Horror',
  'Romance' = 'Romance',
  'Science Fiction' = 'Science Fiction',
}

export type GenreRecord = Record<Genre, boolean>;

export enum GenreFilters {
  'all' = '',
  'documentary' = 'documentary',
  'comedy' = 'comedy',
  'horror' = 'horror',
  'crime' = 'crime',
}

export enum SortFilters {
  'release date' = 'release_date',
  'title' = 'title',
  'raiting' = 'vote_average',
  'popularity' = 'vote_count',
  'duration' = 'runtime',
}

export type GenreQueries = keyof typeof GenreFilters;
export type SortQueries = keyof typeof SortFilters;

export type RequestParams = {
  genre: GenreQueries;
  sortBy: SortQueries;
  query: string;
};

export interface BaseMovie {
  id?: number;
  title: string;
  vote_average?: number;
  release_date: string;
  poster_path: string | null;
  overview: string;
  genres: string[];
  runtime?: number;
  tagline?: string;
  vote_count?: number;
  budget?: number;
  revenue?: number;
}

export interface Movie extends BaseMovie {
  id: number;
  vote_average: number;
  runtime: number;
}

export type FormVariant = {
  legend: 'Add movie' | 'Edit movie';
  successMessage: string;
  apiMethod: 'POST' | 'PUT';
};

type Status = 'INITIAL' | 'LOADING' | 'SUCCESS' | 'ERROR';

export type StatusContent = {
  loading: boolean;
  error: boolean;
  success: boolean;
};
export type Statuses = Record<Status, StatusContent>;

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
  payload: Movie[];
};
type DeleteMovie = {
  type: MoviesActionType.DELETE_MOVIE;
  payload: Movie[];
};

export type MoviesAction =
  | FetchMovies
  | FetchMoviesSuccess
  | FetchMoviesError
  | CreateMovie
  | UpdateMovie
  | DeleteMovie;

export type RootState = {
  movies: MoviesState;
};

export enum SEARCH_PARAMS {
  QUERY = 'query',
  GENRE = 'genre',
  SORT_BY = 'sortBy',
  MOVIE = 'movie',
}

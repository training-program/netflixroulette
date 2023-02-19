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

export type RootState = {
  movies: MoviesState;
};

export enum SEARCH_PARAMS {
  QUERY = 'query',
  GENRE = 'genre',
  SORT_BY = 'sortBy',
  MOVIE = 'movie',
}

export enum PATHS {
  REST = '*',
  ROOT = '/',
  SEARCH = '/search',
  MOVIE = '/search/movie',
  MOVIE_ADD = '/search/movie/add',
  MOVIE_EDIT = '/search/movie/edit/:id',
  MOVIE_DELETE = '/search/movie/delete/:id',
}

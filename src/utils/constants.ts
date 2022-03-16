import {
  Genre,
  GenreFilters,
  SortFilters,
  GenreQueries,
  BaseMovie,
  SortQueries,
  FormVariant,
  Statuses,
} from '@src/types';

export const GENRES = Object.keys(Genre) as Genre[];

export const GENRE_FILTERS = Object.keys(GenreFilters) as GenreQueries[];

export const SORT_BY_FILTERS = Object.keys(SortFilters) as SortQueries[];

export const IMG_PLACEHOLDER = 'https://via.placeholder.com/500x750?text=Image+not+found';

export const DEFAULT_MOVIE: BaseMovie = {
  title: '',
  vote_average: undefined,
  release_date: '',
  poster_path: '',
  overview: '',
  genres: [],
  runtime: undefined,
};

export const RIGHT_OFFSET = 210;
export const BOTTOM_OFFSET = 115;

export const ADD_FORM: FormVariant = {
  legend: 'Add movie',
  successMessage: 'The movie has been added to database successfully',
  apiMethod: 'POST',
};

export const EDIT_FORM: FormVariant = {
  legend: 'Edit movie',
  successMessage: 'The movie has been edited successfully',
  apiMethod: 'PUT',
};

export const STATUSES: Statuses = {
  INITIAL: { loading: false, error: false, success: false },
  LOADING: { loading: true, error: false, success: false },
  SUCCESS: { loading: false, error: false, success: true },
  ERROR: { loading: false, error: true, success: false },
};

export const noop = () => null;

export const API_PATH = 'http://localhost:4000/movies';
export const GET_MOVIES_PATH = '/movies/?sortOrder=asc&searchBy=title&limit=15';

export const DEFAULT_FILTERS = {
  genre: GENRE_FILTERS[0],
  sortBy: SORT_BY_FILTERS[3],
  query: '',
};

export const ERROR_MESSAGES = {
  REQUIRED: 'The field is required',
  NOT_LINK: 'The value should be a link',
  MIN_VALUE: 'The value should be greater than 0',
  MAX_VALUE: 'The value should not exceed 100',
};

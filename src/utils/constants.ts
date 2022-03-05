import {
  isEmpty,
  notSelected,
  isNumber,
  lessThan,
  greaterThan,
  isURI,
} from '@src/utils/validators';
import {
  Genre,
  GenreFilters,
  SortFilters,
  GenreQueries,
  Movie,
  MovieDraft,
  SortQueries,
  FormVariant,
  Statuses,
} from '@src/types';

export const GENRES = Object.keys(Genre) as Genre[];

export const GENRE_FILTERS = Object.keys(GenreFilters) as GenreQueries[];

export const SORT_BY = Object.keys(SortFilters) as SortQueries[];

export const IMG_PLACEHOLDER = 'https://via.placeholder.com/500x750?text=Image+not+found';

export const DEFAULT_MOVIE: Movie = {
  id: 0,
  title: '',
  vote_average: 0,
  release_date: '',
  poster_path: '',
  overview: '',
  genres: [],
  runtime: 0,
};

export const VALIDATORS_SCHEME = {
  title: [isEmpty],
  poster_path: [isURI, isEmpty],
  genres: [notSelected],
  release_date: [isEmpty],
  vote_average: [isNumber, lessThan(10), greaterThan(0), isEmpty],
  runtime: [isNumber, greaterThan(0), lessThan(5000), isEmpty],
  overview: [isEmpty],
};

export const FIELDS = Object.keys(VALIDATORS_SCHEME) as (keyof MovieDraft)[];

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
  sortBy: SORT_BY[0],
  query: '',
};

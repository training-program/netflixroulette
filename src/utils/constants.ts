import { isEmpty, notSelected, isNumber, lessThan, greaterThan } from '@src/utils/validators';
import {
  Genre,
  GenreFilters,
  SortFilters,
  GenreQueries,
  Movie,
  MovieDraft,
  SortQueries,
  FormVariant,
} from '@src/types';

export const GENRES = Object.keys(Genre) as Genre[];

export const GENRE_FILTERS = Object.keys(GenreFilters) as GenreQueries[];

export const SORT_BY = Object.keys(SortFilters) as SortQueries[];

export const IMG_PLACEHOLDER = 'https://via.placeholder.com/500x750?text=Image+not+found';

export const DEFAULT_MOVIE: Movie = {
  id: 0,
  title: '',
  tagline: '',
  vote_average: 0,
  vote_count: 0,
  release_date: '',
  poster_path: '',
  overview: '',
  budget: 0,
  revenue: 0,
  genres: [],
  runtime: 0,
};

export const VALIDATORS_SCHEME = {
  title: [isEmpty],
  poster_path: [isEmpty],
  genres: [notSelected],
  release_date: [isEmpty],
  vote_average: [isNumber, lessThan(10), greaterThan(0), isEmpty],
  runtime: [isNumber, greaterThan(0), isEmpty],
  overview: [isEmpty],
};

export const FIELDS = Object.keys(VALIDATORS_SCHEME) as (keyof MovieDraft)[];

export const RIGHT_OFFSET = 210;
export const BOTTOM_OFFSET = 115;

export const ADD_FORM: FormVariant = {
  legend: 'Add movie',
  action: 'ADD',
  successMessage: 'The movie has been added to database successfully',
};

export const EDIT_FORM: FormVariant = {
  legend: 'Edit movie',
  action: 'EDIT',
  successMessage: 'The movie has been edited successfully',
};

export const STATUSES = {
  INITIAL: { loading: false, error: false },
  LOADING: { loading: true, error: false },
  ERROR: { loading: false, error: true },
};

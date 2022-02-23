import { isEmpty, notSelected, isNumber, lessThan, greaterThan } from '@src/utils/validators';
import { Genre, GenreFilters, SortFilters, SortBy, Movie, MovieDraft } from '@src/types';

export const GENRES = Object.keys(Genre) as Genre[];

export const NAV_GENRES = Object.keys(GenreFilters) as GenreFilters[];

export const SORT_BY = Object.keys(SortFilters) as SortBy[];

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

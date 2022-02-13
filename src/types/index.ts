import { string, number, func, arrayOf, oneOfType, node, shape, instanceOf } from 'prop-types'; //eslint-disable-line

export const MovieShape = {
  id: number.isRequired,
  title: string.isRequired,
  tagline: string,
  release_date: string.isRequired,
  poster_path: string.isRequired,
  vote_average: number.isRequired,
  vote_count: number,
  overview: string.isRequired,
  budget: number,
  revenue: number,
  genres: arrayOf(string),
  runtime: number.isRequired,
};

export const Children = oneOfType([arrayOf(node), node]);

export const RefProp = oneOfType([func, shape({ current: instanceOf(Element) })]);

export type Genres =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'Horror'
  | 'Romance'
  | 'Science Fiction';

export type GenresChecklist = { [Property in Genres]: boolean };

export type NavGenres = 'All' | 'Documentary' | 'Comedy' | 'Horror' | 'Crime';

export enum SortingMap {
  'Release date' = 'release_date',
  'Title' = 'title',
  'Raiting' = 'vote_average',
  'Popularity' = 'vote_count',
  'Duration' = 'runtime',
}

export type SortBy = keyof typeof SortingMap;

export type Movie = {
  id: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  genres: string[];
  runtime: number;
};

export type Validator = {
  test: (value: string | GenresChecklist) => boolean;
  error: string;
};

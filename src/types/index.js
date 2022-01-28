import { string, number, shape, arrayOf } from 'prop-types';

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

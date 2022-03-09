import { Movie } from '@src/types';

export type ResultsBodyProps = {
  loading: boolean;
  error: boolean;
  movies: Movie[];
};

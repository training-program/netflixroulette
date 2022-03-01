import { Movie, StatusContent } from '@src/types';

export type ResultsBodyProps = {
  status: StatusContent;
  movies: Movie[];
};

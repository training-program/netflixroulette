import { GenreQueries, RequestParams } from '@src/types';

export type GenreFilterProps = {
  selected: GenreQueries;
  filterMovies: (params?: Partial<RequestParams>) => void;
};

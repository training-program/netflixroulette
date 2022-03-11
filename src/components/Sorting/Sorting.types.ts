import { RequestParams, SortQueries } from '@src/types';

export type SortingProps = {
  selected: SortQueries;
  filterMovies: (params?: Partial<RequestParams> | undefined) => void;
};

import { RequestParams } from '@src/types';

export type HeaderProps = {
  filterMovies: (params?: Partial<RequestParams>) => void;
  query: string;
};

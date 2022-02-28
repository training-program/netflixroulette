import { createContext } from 'react';
import { RequestParameters } from '@src/types';
import { GENRE_FILTERS, SORT_BY } from '@src/utils/constants';
import { Status, Context } from './context.types';

export const inititalRequestParameters: RequestParameters = {
  genre: GENRE_FILTERS[0],
  sortBy: SORT_BY[0],
  query: '',
};

export const initialRequestStatus: Status = {
  loading: false,
  error: false,
};

export const AppContext = createContext<Context>({
  movies: [],
  dispatchMovieContext: () => {},
  requestParameters: inititalRequestParameters,
  setRequestParameters: () => {},
  status: initialRequestStatus,
  setStatus: () => {},
});

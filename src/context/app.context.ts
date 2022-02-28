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

export const initialContext: Context = {
  movies: [],
  dispatchMovieContext: () => {},
  showAdd: false,
  setShowAdd: () => {},
  showEdit: false,
  setShowEdit: () => {},
  showDelete: false,
  setShowDelete: () => {},
  showMovieDetails: false,
  setShowMovieDetails: () => {},
  requestParameters: inititalRequestParameters,
  setRequestParameters: () => {},
  status: initialRequestStatus,
  setStatus: () => {},
};

export const AppContext = createContext<Context>(initialContext);

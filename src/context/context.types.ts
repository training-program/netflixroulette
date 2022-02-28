import { Dispatch, SetStateAction } from 'react';
import { Movie, ContextAction, RequestParameters } from '@src/types';

export type Status = {
  loading: boolean;
  error: boolean;
};

export type Context = {
  movies: Movie[];
  dispatchMovieContext: Dispatch<ContextAction>;
  requestParameters: RequestParameters;
  setRequestParameters: Dispatch<SetStateAction<RequestParameters>>;
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
};

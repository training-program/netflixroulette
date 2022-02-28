import { Dispatch, SetStateAction } from 'react';
import { Movie, ContextAction, RequestParameters } from '@src/types';

export type Status = {
  loading: boolean;
  error: boolean;
};

export type Context = Readonly<{
  movies: Movie[];
  dispatchMovieContext: Dispatch<ContextAction>;
  showAdd: boolean;
  setShowAdd: Dispatch<SetStateAction<boolean>>;
  showEdit: boolean;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  showDelete: boolean;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  showMovieDetails: boolean;
  setShowMovieDetails: Dispatch<SetStateAction<boolean>>;
  requestParameters: RequestParameters;
  setRequestParameters: Dispatch<SetStateAction<RequestParameters>>;
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
}>;

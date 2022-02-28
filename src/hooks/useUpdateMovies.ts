import { useContext } from 'react';
import API from '@src/api/api';
import { AppContext } from '@src/context/app.context';
import { ContextActionType, RequestParameters } from '@src/types';
import { STATUSES } from '@src/utils/constants';

const { LOADING, SUCCESS, ERROR } = STATUSES;

const useUpdateMovies = () => {
  const { dispatchMovieContext, requestParameters, setRequestParameters, status, setStatus } =
    useContext(AppContext);

  const updateMovies = (parameters?: Partial<RequestParameters>) => {
    setStatus(LOADING);
    const { genre, sortBy, query } = { ...requestParameters, ...parameters };

    API.getAll(genre, sortBy, query)
      .then((response) => {
        dispatchMovieContext({ type: ContextActionType.UPDATE, payload: response });
        setRequestParameters({ genre, sortBy, query });
        setStatus(SUCCESS);
      })
      .catch((error: Error) => {
        setStatus(ERROR);
        console.error(error); // eslint-disable-line
      });
  };
  return { ...requestParameters, status, updateMovies };
};

export default useUpdateMovies;

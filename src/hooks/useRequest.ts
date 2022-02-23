import { useContext } from 'react';
import API from '@src/api/api';
import { AppContext } from '@src/context/app.context';
import { RequestParameters } from '@src/types';
import { STATUSES } from '@src/utils/constants';

const { INITIAL, LOADING, ERROR } = STATUSES;

const useRequest = () => {
  const { dispatch, requestParameters, setRequestParameters, status, setStatus } =
    useContext(AppContext);

  const doRequest = (parameters?: Partial<RequestParameters>) => {
    const { genre, sortBy, query } = { ...requestParameters, ...parameters };
    setStatus(LOADING);

    API.getAll(genre, sortBy, query)
      .then((response) => {
        dispatch({ type: 'UPDATE', payload: response });
        setRequestParameters({ genre, sortBy, query });
        setStatus(INITIAL);
      })
      .catch((error: Error) => {
        setStatus(ERROR);
        console.error(error); // eslint-disable-line
      });
  };
  return [{ ...requestParameters, ...status }, doRequest] as const;
};

export default useRequest;

import { useState, useContext } from 'react';
import API from '@src/api/api';
import { STATUSES } from '@src/utils/constants';
import { AppContext } from '@src/context/app.context';
import { ContextAction, ProxyContextAction } from '@src/types';
import useAbortRequest from './useAbortRequest';

const { INITIAL, LOADING, ERROR } = STATUSES;

const useFetch = (callback?: () => void) => {
  const { dispatch } = useContext(AppContext);
  const [status, setStatus] = useState(INITIAL);

  useAbortRequest(status.loading);

  const doFetch = (action: ProxyContextAction) => {
    setStatus(LOADING);

    const dispatchSuccess = (dispatchAction: ContextAction) => {
      setStatus(INITIAL);
      dispatch(dispatchAction);

      if (callback) {
        callback();
      }
    };

    const dispatchError = (error: Error) => {
      console.error(error); // eslint-disable-line

      if (error.message !== 'Request canceled') {
        setStatus(ERROR);
      }
    };

    switch (action.type) {
      case 'ADD': {
        const { type, payload } = action;

        API.add(payload)
          .then((response) => dispatchSuccess({ type, payload: response }))
          .catch(dispatchError);

        break;
      }
      case 'EDIT': {
        const { type, payload } = action;

        API.edit(payload)
          .then((response) => dispatchSuccess({ type, payload: response }))
          .catch(dispatchError);

        break;
      }
      case 'DELETE': {
        const { type, payload } = action;

        API.delete(payload)
          .then(() => dispatchSuccess({ type, payload }))
          .catch(dispatchError);

        break;
      }
      default: {
        // eslint-disable-next-line
        console.error(`Action type doesn't match the API`);
      }
    }
  };

  return [status, doFetch] as const;
};

export default useFetch;

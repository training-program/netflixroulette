import { useReducer, Dispatch } from 'react';
import API from '@src/api/api';
import { ContextAction } from '@src/types';
import useAbortRequest from './useAbortRequest';
import { FetchState, FetchAction, FetchActionType } from './hooks.types';

const initialFetch: FetchState = {
  loading: false,
  error: false,
};

const fetchReducer = (state: FetchState, action: FetchAction) => {
  switch (action.type) {
    case FetchActionType.Loading: {
      return { ...state, loading: true };
    }
    case FetchActionType.Fetched: {
      return { ...state, loading: false };
    }
    case FetchActionType.FetchError: {
      return { ...state, error: true, loading: false };
    }
    default: {
      return state;
    }
  }
};

const useFetch = (dispatchContext: Dispatch<ContextAction>, callback: () => void) => {
  const [state, dispatch] = useReducer(fetchReducer, initialFetch);
  useAbortRequest(state.loading);

  const doFetch = (action: ContextAction) => {
    dispatch({ type: FetchActionType.Loading });

    const dispatchSuccess = (dispatchAction: ContextAction) => {
      dispatch({ type: FetchActionType.Fetched });
      dispatchContext(dispatchAction);
      callback();
    };

    const dispatchError = (error: Error) => {
      console.error(error); // eslint-disable-line

      if (error.message !== 'Request canceled') {
        dispatch({ type: FetchActionType.FetchError });
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
        console.error(`Action type '${action.type}' doesn't match the API`);
      }
    }
  };

  return [state, doFetch] as const;
};

export default useFetch;

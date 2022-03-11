import { useCallback, useState } from 'react';
import { STATUSES } from '@src/utils/constants';
import { Movie, RequestParams } from '@src/types';
import { ApiResponse } from './hooks.types';

const { INITIAL, LOADING, SUCCESS, ERROR } = STATUSES;

const useSendRequest = <T extends Movie | RequestParams | number>(
  request: (params: T) => Promise<ApiResponse<T>>,
  onSuccess?: (response: ApiResponse<T>) => void,
  onError?: (error: Error) => void,
) => {
  const [status, setStatus] = useState(INITIAL);

  const sendRequest = useCallback(
    (params: T) => {
      setStatus(LOADING);
      request(params)
        .then((response: ApiResponse<T>) => {
          setStatus(SUCCESS);

          if (onSuccess) {
            onSuccess(response);
          }
        })
        .catch((error) => {
          setStatus(ERROR);

          if (onError) {
            onError(error);
          }
        });
    },
    [request, onSuccess, onError],
  );

  return { status, sendRequest };
};

export default useSendRequest;

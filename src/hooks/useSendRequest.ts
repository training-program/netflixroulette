import { useState } from 'react';
import { STATUSES } from '@src/utils/constants';
import { Movie } from '@src/types';

const { INITIAL, LOADING, SUCCESS, ERROR } = STATUSES;

const useSendRequest = <T extends Movie | number>(
  request: (params: T) => Promise<T extends Movie ? Movie : void>,
  onSuccess?: (response: T extends Movie ? Movie : void) => void,
  onError?: (error: Error) => void,
) => {
  const [status, setStatus] = useState(INITIAL);

  const sendRequest = (params: any) => {
    setStatus(LOADING);
    request(params)
      .then((response: any) => {
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
  };

  return { status, sendRequest };
};

export default useSendRequest;

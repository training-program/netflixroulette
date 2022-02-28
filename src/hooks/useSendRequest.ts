import { useState } from 'react';
import { STATUSES } from '@src/utils/constants';

const { INITIAL, LOADING, SUCCESS, ERROR } = STATUSES;

const useSendRequest = (
  request: (params: any) => Promise<any>,
  onSuccess?: (response: any) => void,
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

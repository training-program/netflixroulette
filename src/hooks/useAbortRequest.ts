import { useEffect, useRef } from 'react';
import API from '@src/api/api';

const useAbortRequest = (loading: boolean) => {
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  useEffect(
    () => () => {
      if (loadingRef.current) {
        API.tryToCancel();
      }
    },
    [],
  );
};

export default useAbortRequest;

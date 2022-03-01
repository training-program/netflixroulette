import { useEffect, useRef } from 'react';

const useAbortRequest = (loading: boolean, controller: AbortController) => {
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  useEffect(
    () => () => {
      if (loadingRef.current) {
        controller.abort();
      }
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
};

export default useAbortRequest;

import { useEffect } from 'react';

const useAbortRequest = (controller: AbortController) => {
  useEffect(
    () => () => {
      controller.abort();
    },
    [controller],
  );
};

export default useAbortRequest;

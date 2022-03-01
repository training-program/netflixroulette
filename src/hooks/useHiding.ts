import { useRef } from 'react';
import { OnClose } from './hooks.types';
import useBlur from './useBlur';

const useHiding = (onClose: OnClose) => {
  const ref = useRef<HTMLDivElement>(null);

  return useBlur(ref, onClose, true);
};

export default useHiding;

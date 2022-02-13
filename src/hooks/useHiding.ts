import { useRef } from 'react';
import { useBlur, OnClose } from './useBlur';

const useHiding = (onClose: OnClose) => {
  const ref = useRef<HTMLDivElement>(null);

  return useBlur(ref, onClose, true);
};

export default useHiding;

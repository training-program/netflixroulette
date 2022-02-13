import { useState, useRef, useCallback } from 'react';
import { useBlur, ReactDevRef } from './useBlur';

const useToggle = (
  callback?: ([...args]?: any[]) => unknown,
): [ReactDevRef, boolean, (
  ) => void] => {
  const ref = useRef<HTMLDivElement>(null);

  const [showElement, setShowElement] = useState(false);
  const handleClose = useCallback(() => setShowElement(false), []);
  const onToggle = useCallback(() => setShowElement((prevState) => !prevState), []);

  useBlur(ref, handleClose, showElement, callback);

  return [ref, showElement, onToggle];
};
export default useToggle;

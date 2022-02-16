import { useState, useRef, useCallback } from 'react';
import { ReactDevRef } from './hooks.types';
import useBlur from './useBlur';

const useToggle = (): [ReactDevRef, boolean, () => void] => {
  const ref = useRef<HTMLDivElement>(null);

  const [showElement, setShowElement] = useState(false);
  const handleClose = useCallback(() => setShowElement(false), []);
  const onToggle = useCallback(() => setShowElement((prevState) => !prevState), []);

  useBlur(ref, handleClose, showElement);

  return [ref, showElement, onToggle];
};
export default useToggle;

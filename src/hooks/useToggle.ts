import { useState, useRef, useCallback } from 'react';
import useBlur from './useBlur';

const useToggle = () => {
  const toggleRef = useRef<HTMLDivElement>(null);

  const [showElement, setShowElement] = useState(false);
  const handleClose = useCallback(() => setShowElement(false), []);
  const onToggle = useCallback(() => setShowElement((prevState) => !prevState), []);

  useBlur(toggleRef, handleClose, showElement);

  return { toggleRef, showElement, onToggle };
};
export default useToggle;

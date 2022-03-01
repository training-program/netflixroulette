import { useEffect } from 'react';
import { noop } from '@src/utils/constants';
import { OnClose, ReactDevRef } from './hooks.types';

const useBlur = (ref: ReactDevRef, onClose: OnClose, isShow: boolean) => {
  useEffect(() => {
    const { current } = ref;

    if (!current || !isShow) {
      return noop;
    }

    const handleBlur = (event: FocusEvent) => {
      const { target } = event;
      const currentTarget = event.currentTarget as Element;
      const relatedTarget = event.relatedTarget as Element | null;

      const isClickOutsideWindow = document.activeElement === target;

      if (!ref.current || isClickOutsideWindow || currentTarget.contains(relatedTarget)) {
        return;
      }

      onClose(event);
    };

    current.tabIndex = 1;
    current.focus();
    current.addEventListener('blur', handleBlur, true);

    return () => current.removeEventListener('blur', handleBlur);
  }, [onClose, ref, isShow]);

  return ref;
};

export default useBlur;

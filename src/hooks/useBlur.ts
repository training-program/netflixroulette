import { useEffect } from 'react';

export type OnClose = (event: Event | React.SyntheticEvent) => unknown;
export type ReactDevRef = React.RefObject<HTMLDivElement>;

export const useBlur = (
  ref: ReactDevRef,
  onClose: OnClose,
  isShow: boolean,
  callback?: ([...args]?: any[]) => unknown,
) => {
  useEffect(() => {
    const { current } = ref;

    if (!current) {
      throw new Error('Ref is not assigned');
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

      if (callback) {
        callback();
      }
    };

    if (isShow) {
      current.tabIndex = 1;
      current.focus();
      current.addEventListener('blur', handleBlur, true);
    }

    return () => current.removeEventListener('blur', handleBlur);
  }, [onClose, ref, isShow, callback]);

  return ref;
};

import { SyntheticEvent, ReactNode } from 'react';

export type DialogProps = {
  onClose: (event: SyntheticEvent | Event) => void;
  children: ReactNode;
};

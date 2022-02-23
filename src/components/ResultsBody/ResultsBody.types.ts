import { Dispatch, SetStateAction } from 'react';

export type ResultsBodyProps = {
  showLoader: boolean;
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  onOpenView: () => void;
  setCurrentId: Dispatch<SetStateAction<number | null>>;
};

import { Dispatch, SetStateAction } from 'react';

export type ResultsBodyProps = {
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  onOpenMovieDetails: () => void;
  setCurrentId: Dispatch<SetStateAction<number | null>>;
};

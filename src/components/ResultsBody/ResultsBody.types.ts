import { Dispatch, SetStateAction } from 'react';
import { Movie } from '@src/types/';

export type ResultsBodyProps = {
  movies: Movie[];
  showLoader: boolean;
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  onOpenView: () => void;
  setCurrentId: Dispatch<SetStateAction<number | null>>;
};

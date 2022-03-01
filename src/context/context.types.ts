import { Dispatch, SetStateAction } from 'react';

export type Context = {
  setCurrentId: Dispatch<SetStateAction<number | null>>;
  setShowAdd: Dispatch<SetStateAction<boolean>>;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  setShowMovieDetails: Dispatch<SetStateAction<boolean>>;
};

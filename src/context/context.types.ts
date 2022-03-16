import { Dispatch, SetStateAction } from 'react';

export type Context = {
  setEditingMovieId: Dispatch<SetStateAction<number | null>>;
  setShowAdd: Dispatch<SetStateAction<boolean>>;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
};

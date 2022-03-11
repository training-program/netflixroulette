import { Dispatch, SetStateAction } from 'react';

export type Context = {
  setActiveMovieId: Dispatch<SetStateAction<number | null>>;
  setEditingMovieId: Dispatch<SetStateAction<number | null>>;
  setShowAdd: Dispatch<SetStateAction<boolean>>;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
};

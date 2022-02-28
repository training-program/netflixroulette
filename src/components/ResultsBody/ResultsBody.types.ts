import { Dispatch, SetStateAction } from 'react';

export type ResultsBodyProps = {
  setCurrentId: Dispatch<SetStateAction<number | null>>;
};

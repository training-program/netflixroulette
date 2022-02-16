import { Dispatch, SetStateAction } from 'react';
import { SortBy } from '@src/types/';

export type SortingProps = {
  onChange: Dispatch<SetStateAction<SortBy>>;
  selected: string;
};

import { Dispatch, SetStateAction } from 'react';
import { RequestParameters, SortQueries } from '@src/types/';

export type SortingProps = {
  onChange: Dispatch<SetStateAction<RequestParameters>>;
  selected: SortQueries;
};

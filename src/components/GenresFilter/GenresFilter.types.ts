import { Dispatch, SetStateAction } from 'react';
import { GenreQueries, RequestParameters } from '@src/types/';

export type GenreFilterProps = {
  onChange: Dispatch<SetStateAction<RequestParameters>>;
  selected: GenreQueries;
};

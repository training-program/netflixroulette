import { Dispatch, SetStateAction } from 'react';
import { GenreFilters } from '@src/types/';

export type GenreFilterProps = {
  onChange: Dispatch<SetStateAction<GenreFilters>>;
  selected: GenreFilters;
};

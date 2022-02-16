import { Dispatch, SetStateAction } from 'react';
import { NavGenres } from '@src/types/';

export type GenreFilterProps = {
  onChange: Dispatch<SetStateAction<NavGenres>>;
  selected: NavGenres;
};

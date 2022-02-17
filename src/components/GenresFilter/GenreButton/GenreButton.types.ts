import { GenreFilters } from '@src/types/';

export type GenreButtonProps = {
  active: boolean;
  genre: GenreFilters;
  onClick: (genre: GenreFilters) => void;
};

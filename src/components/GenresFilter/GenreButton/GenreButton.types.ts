import { NavGenres } from '@src/types/';

export type GenreButtonProps = {
  active: boolean;
  genre: NavGenres;
  onClick: (genre: NavGenres) => void;
};

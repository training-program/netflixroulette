import { GenreQueries } from '@src/types/';

export type GenreButtonProps = {
  active: boolean;
  genre: GenreQueries;
  onClick: (genre: GenreQueries) => void;
};

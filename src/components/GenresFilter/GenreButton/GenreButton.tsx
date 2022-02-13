import * as React from 'react';
import { NavGenres } from '@src/types/';
import styles from './GenreButton.module.scss';

type Props = {
  active: boolean;
  genre: NavGenres;
  onClick: (genre: NavGenres) => void;
};

const GenreButton = ({ onClick, genre, active }: Props) => {
  const handleClick = () => {
    onClick(genre);
  };
  return (
    <button
      type="button"
      className={active ? styles.genreBtn_active : styles.genreBtn}
      onClick={handleClick}
    >
      {genre.toUpperCase()}
    </button>
  );
};

export default GenreButton;

import React from 'react';
import { GenreButtonProps } from './GenreButton.types';
import styles from './GenreButton.module.scss';

const GenreButton = ({ onClick, genre, active }: GenreButtonProps) => {
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

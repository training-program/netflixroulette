import React, { SyntheticEvent, useRef } from 'react';
import useUpdateMovies from '@src/hooks/useUpdateMovies';
import { HeaderProps } from './Header.types';
import styles from './Header.module.scss';

import Title from '../Title/Title';

const Header = ({ onOpenAdd }: HeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, updateMovies } = useUpdateMovies();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const { current } = inputRef;

    if (!current) {
      return;
    }

    const newQuery = current.value;

    if (newQuery !== query) {
      updateMovies({ query: newQuery });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.topWrapper}>
        <Title />
        <button type="button" className={styles.addMovieBtn} onClick={onOpenAdd}>
          + ADD MOVIE
        </button>
      </div>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <fieldset className={styles.searchForm__fieldset}>
          <legend className={styles.searchForm__label}>FIND YOUR MOVIE</legend>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="What do you want to watch?"
            ref={inputRef}
          />
          <button type="submit" className={styles.searchBtn}>
            SEARCH
          </button>
        </fieldset>
      </form>
    </header>
  );
};

export default Header;

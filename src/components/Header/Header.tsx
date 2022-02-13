import React, { useRef } from 'react';
import styles from './Header.module.scss';

import Title from '../Title/Title';

type Props = {
  onOpenAdd: () => void;
  onSubmit: React.Dispatch<React.SetStateAction<string>>;
  query: string;
};

const Header = ({ onOpenAdd, onSubmit, query }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null!);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newQuery = inputRef.current.value;

    if (newQuery !== query) {
      onSubmit(newQuery);
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

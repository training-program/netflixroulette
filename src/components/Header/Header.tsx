import React, { SyntheticEvent, useContext, useRef } from 'react';
import AppContext from '@src/context/app.context';
import { RootState } from '@src/store';

import { connect, ConnectedProps } from 'react-redux';
import { fetchMovies } from '@src/store/actionCreators/movies';
import styles from './Header.module.scss';

import Title from '../Title/Title';

const connector = connect(
  ({
    movies: {
      requestParams: { query },
    },
  }: RootState) => ({ query }),
  {
    filterMovies: fetchMovies,
  },
);

const Header = ({ filterMovies, query }: ConnectedProps<typeof connector>) => {
  const { setShowAdd } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => setShowAdd(true);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const { current } = inputRef;

    if (!current) {
      return;
    }

    const newQuery = current.value;

    if (newQuery !== query) {
      filterMovies({ query: newQuery });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.topWrapper}>
        <Title />
        <button type="button" className={styles.addMovieBtn} onClick={handleClick}>
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

export default connector(Header);

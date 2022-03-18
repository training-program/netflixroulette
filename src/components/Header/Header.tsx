import React, { SyntheticEvent, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '@src/types';
import { connect } from 'react-redux';
import { selectQuery } from '@src/store/selectors/movies.selectors';
import { HeaderProps } from './Header.types';
import styles from './Header.module.scss';

import Title from '../Title/Title';

const Header = ({ query }: HeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => navigate('/movie/add', { state: { backgroundLocation: location } });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const { current } = inputRef;

    if (!current) {
      return;
    }

    const newQuery = current.value;

    if (newQuery !== query) {
      navigate(`?query=${newQuery}`);
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
            defaultValue={query}
          />
          <button type="submit" className={styles.searchBtn}>
            SEARCH
          </button>
        </fieldset>
      </form>
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({ query: selectQuery(state) });

export default connect(mapStateToProps)(Header);

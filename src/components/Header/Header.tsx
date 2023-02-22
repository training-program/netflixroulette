import React, { SyntheticEvent, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS, RootState, SEARCH_PARAMS } from '@src/types';
import useQueryString from '@src/hooks/useQueryString';
import { connect } from 'react-redux';
import { selectQuery } from '@src/store/selectors/movies.selectors';
import { HeaderProps } from './Header.types';
import styles from './Header.module.scss';

import Title from '../Title/Title';
import Button from '../common/Button/Button';

const Header = ({ query }: HeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const setQueryString = useQueryString();

  const handleClick = () => navigate(PATHS.MOVIE_ADD, { state: { backgroundLocation: location } });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const { current } = inputRef;

    if (!current) {
      return;
    }

    const newQuery = current.value;

    if (newQuery !== query) {
      setQueryString(SEARCH_PARAMS.QUERY, newQuery);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.topWrapper}>
        <Title />
        <Button type="button" variant="ghost" size="sm" onClick={handleClick}>
          + ADD MOVIE
        </Button>
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
            data-test="search-input"
          />
          <Button type="submit" data-test="search-button">
            SEARCH
          </Button>
        </fieldset>
      </form>
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({ query: selectQuery(state) });

export default connect(mapStateToProps)(Header);

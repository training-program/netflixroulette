import React from 'react';
import styles from './Header.module.scss';

const Header = props => {
  const handleClick = () => props.handleOpenAdd();

  return (
    <header className={styles.header}>
      <div className={styles.topWrapper}>
        <span className={styles.title}>
          <b>netflix</b>roulette
        </span>
        <button className={styles.addMovieBtn} onClick={handleClick}>
          + ADD MOVIE
        </button>
      </div>
      <form className={styles.searchWrapper}>
        <label htmlFor="movie-search-input">FIND YOUR MOVIE</label>
        <div>
          <input
            id="movie-search-input"
            name="movie-search-input"
            type="text"
            className={styles.searchInput}
            placeholder="What do you want to watch?"
          />
          <input type="submit" value="SEARCH" className={styles.searchBtn} />
        </div>
      </form>
    </header>
  );
};

export default Header;

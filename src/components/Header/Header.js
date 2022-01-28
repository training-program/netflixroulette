import React, { Component, createRef } from 'react';
import styles from './Header.module.scss';
import { func, string } from 'prop-types';

class Header extends Component {
  static propTypes = {
    onOpenAdd: func.isRequired,
    onSubmit: func.isRequired,
    query: string.isRequired,
  };
  inputRef = createRef();
  handleSubmit = event => {
    event.preventDefault();

    const { onSubmit, query } = this.props;
    const newQuery = this.inputRef.current.value;

    if (newQuery !== query) onSubmit({ query: newQuery });
  };
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.topWrapper}>
          <span className={styles.title}>
            <b>netflix</b>roulette
          </span>
          <button className={styles.addMovieBtn} onClick={this.props.onOpenAdd}>
            + ADD MOVIE
          </button>
        </div>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <label className={styles.searchForm__label} htmlFor="movie-search-input">
            FIND YOUR MOVIE
          </label>
          <fieldset className={styles.searchForm__field}>
            <input
              id="movie-search-input"
              name="movie-search-input"
              type="text"
              className={styles.searchInput}
              placeholder="What do you want to watch?"
              onChange={this.handleChange}
              ref={this.inputRef}
            />
            <button type="submit" className={styles.searchBtn}>
              SEARCH
            </button>
          </fieldset>
        </form>
      </header>
    );
  }
}

export default Header;

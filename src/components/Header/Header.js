import React, { Component, createRef } from 'react';
import { func, string } from 'prop-types';
import styles from './Header.module.scss';

class Header extends Component {
  inputRef = createRef();

  handleSubmit = (event) => {
    event.preventDefault();

    const { onSubmit, query } = this.props;
    const newQuery = this.inputRef.current.value;

    if (newQuery !== query) {
      onSubmit({ query: newQuery });
    }
  };

  render() {
    const { onOpenAdd } = this.props;

    return (
      <header className={styles.header}>
        <div className={styles.topWrapper}>
          <span className={styles.title}>
            <b>netflix</b>
            roulette
          </span>
          <button type="button" className={styles.addMovieBtn} onClick={onOpenAdd}>
            + ADD MOVIE
          </button>
        </div>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <fieldset className={styles.searchForm__fieldset}>
            <legend className={styles.searchForm__label}>FIND YOUR MOVIE</legend>
            <input
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

Header.propTypes = {
  onOpenAdd: func.isRequired,
  onSubmit: func.isRequired,
  query: string.isRequired,
};

export default Header;

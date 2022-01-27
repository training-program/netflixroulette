import React, { Component } from 'react';
import styles from './Header.module.scss';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {
    onOpenAdd: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange({ target: { value } }) {
    this.setState({ query: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({ query: this.state.query });
  }
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

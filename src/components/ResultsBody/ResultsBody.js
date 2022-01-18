import React, { Component } from 'react';
import styles from './ResultsBody.module.scss';
import PropTypes from 'prop-types';

import MovieCard from './MovieCard/MovieCard.js';
import GenresFilter from './GenresFilter/GenresFilter.js';
import Sorting from './Sorting/Sorting.js';
import ContextMenu from './ContextMenu/ContextMenu';

class ResultsBody extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        tagline: PropTypes.string,
        release_date: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
      })
    ),
    genres: PropTypes.arrayOf(PropTypes.string),
    sortOptions: PropTypes.arrayOf(PropTypes.string),
  };
  constructor(props) {
    super(props);

    this.state = {
      menuIsShow: false,
      menuProps: null,
    };

    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }
  handleOpenMenu(e, id) {
    e.preventDefault();
    const menuProps = { coordX: e.pageX, coordY: e.pageY, id };
    this.setState({ menuIsShow: true, menuProps });
  }
  handleCloseMenu() {
    this.setState({ menuIsShow: false });
  }
  render() {
    const count = this.props.movies.length;
    const { GENRES, SORTBY, onChange, movies, handleOpenEdit, handleOpenDelete } = this.props;

    return (
      <>
        <section className={styles.container}>
          <div className={styles.controlsBar}>
            <GenresFilter options={GENRES} onChange={onChange} />
            <Sorting options={SORTBY} onChange={onChange} />
          </div>
          <hr className={styles.hr} />
          <div className={styles.resultCount}>
            <b>{String(count)}</b>
            {` movie${count === 1 ? '' : 's'} found`}
          </div>
          <div className={styles.movieList}>
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onContextMenu={this.handleOpenMenu} />
            ))}
            {this.state.menuIsShow && (
              <ContextMenu
                {...this.state.menuProps}
                handleClose={this.handleCloseMenu}
                handleOpenEdit={handleOpenEdit}
                handleOpenDelete={handleOpenDelete}
              />
            )}
          </div>
        </section>
        <footer className={styles.footer}>
          <span>
            <b>netflix</b>roulette
          </span>
        </footer>
      </>
    );
  }
}

export default ResultsBody;

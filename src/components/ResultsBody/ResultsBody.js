import React, { Component } from 'react';
import styles from './ResultsBody.module.scss';
import { arrayOf, func, bool, shape } from 'prop-types';
import { MovieShape } from 'Types';

import MovieCard from './MovieCard/MovieCard.js';
import GenresFilter from './GenresFilter/GenresFilter.js';
import Sorting from './Sorting/Sorting.js';
import ContextMenu from './ContextMenu/ContextMenu';
import Fallback from '../Fallback/Fallback';

class ResultsBody extends Component {
  static propTypes = {
    movies: arrayOf(shape(MovieShape)),
    onChange: func.isRequired,
    loader: bool.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      coordinateX: 0,
      coordinateY: 0,
      id: undefined,
    };

    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }
  handleOpenMenu(event, id) {
    event.preventDefault();
    this.setState({ showMenu: true, coordinateX: event.pageX, coordinateY: event.pageY, id });
  }
  handleCloseMenu() {
    this.setState({ showMenu: false });
  }
  render() {
    const { onChange, movies, loader, ...props } = this.props;
    const { showMenu, coordinateX, coordinateY, id } = this.state;

    return (
      <>
        <section className={styles.container}>
          <div className={styles.controlsBar}>
            <GenresFilter onChange={onChange} />
            <Sorting onChange={onChange} />
          </div>
          <hr className={styles.hr} />
          {loader ? (
            <Fallback />
          ) : (
            <>
              <div className={styles.resultCount}>
                <b className={styles.resultCount__digit}>{String(movies.length)}</b>
                {` movie${movies.length === 1 ? '' : 's'} found`}
              </div>
              <div className={styles.movieList}>
                {movies.map(movie => (
                  <MovieCard key={movie.id} {...movie} onContextMenu={this.handleOpenMenu} />
                ))}
                {showMenu && (
                  <ContextMenu
                    onClose={this.handleCloseMenu}
                    coordinateX={coordinateX}
                    coordinateY={coordinateY}
                    id={id}
                    {...props}
                  />
                )}
              </div>
            </>
          )}
        </section>
        <footer className={styles.footer}>
          <span className={styles.footer__title}>
            <b>netflix</b>roulette
          </span>
        </footer>
      </>
    );
  }
}

export default ResultsBody;

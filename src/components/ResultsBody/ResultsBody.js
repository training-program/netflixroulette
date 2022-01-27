import React, { Component } from 'react';
import styles from './ResultsBody.module.scss';
import { arrayOf, bool, shape } from 'prop-types';
import { MovieShape } from '@src/types';

import MovieCard from './MovieCard/MovieCard.js';
import ContextMenu from './ContextMenu/ContextMenu';
import Spinner from '../Spinner/Spinner';

class ResultsBody extends Component {
  static propTypes = {
    movies: arrayOf(shape(MovieShape)),
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

    return loader ? (
      <Spinner />
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
    );
  }
}

export default ResultsBody;

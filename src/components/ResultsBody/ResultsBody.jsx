import React, { Component } from 'react';
import {
  arrayOf, bool, shape, func,
} from 'prop-types';
import { MovieShape } from '@src/types';
import styles from './ResultsBody.module.scss';

import MovieCard from './MovieCard/MovieCard.jsx';
import ContextMenu from './ContextMenu/ContextMenu.jsx';
import Spinner from '../Spinner/Spinner.jsx';

class ResultsBody extends Component {
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
    this.setState({
      showMenu: true,
      coordinateX: event.pageX,
      coordinateY: event.pageY,
      id,
    });
  }

  handleCloseMenu() {
    this.setState({ showMenu: false });
  }

  render() {
    const {
      movies, loader, onOpenEdit, onOpenDelete,
    } = this.props;
    const {
      showMenu, coordinateX, coordinateY, id,
    } = this.state;

    return loader ? (
      <Spinner />
    ) : (
      <>
        <div className={styles.resultCount}>
          <b className={styles.resultCount__digit}>{String(movies.length)}</b>
          {` movie${movies.length === 1 ? '' : 's'} found`}
        </div>
        <div className={styles.movieList}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              tagline={movie.tagline}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
              onContextMenu={this.handleOpenMenu}
            />
          ))}
          {showMenu && (
            <ContextMenu
              onClose={this.handleCloseMenu}
              coordinateX={coordinateX}
              coordinateY={coordinateY}
              id={id}
              onOpenEdit={onOpenEdit}
              onOpenDelete={onOpenDelete}
            />
          )}
        </div>
      </>
    );
  }
}

ResultsBody.propTypes = {
  movies: arrayOf(shape(MovieShape)).isRequired,
  loader: bool.isRequired,
  onOpenEdit: func.isRequired,
  onOpenDelete: func.isRequired,
};

export default ResultsBody;

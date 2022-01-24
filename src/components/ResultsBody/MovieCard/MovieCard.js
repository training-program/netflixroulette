import React, { Component } from 'react';
import styles from './MovieCard.module.scss';
import PropTypes from 'prop-types';
import { MovieShape } from 'Types';

class MovieCard extends Component {
  static propTypes = {
    movie: MovieShape,
    onContextMenu: PropTypes.func.isRequired,
  };
  handleOpenMenu = event => {
    event.preventDefault();
    const { onContextMenu, movie } = this.props;
    onContextMenu(event, movie.id);
  };
  render() {
    const { movie } = this.props;
    const year = new Date(movie.release_date).getFullYear();

    return (
      !!movie.title && (
        <div className={styles.card} onContextMenu={this.handleOpenMenu}>
          <picture className={styles.poster}>
            <img src={movie.poster_path} className={styles.poster__img} alt="Movie poster" />
          </picture>
          <div className={styles.info}>
            <div className={styles.info__left}>
              <span className={styles.info__title}>{movie.title}</span>
              <span className={styles.info__tagline}>{movie.tagline || movie.title}</span>
            </div>
            {!!year && (
              <div className={styles.info__right}>
                <span className={styles.info__year}>{year}</span>
              </div>
            )}
          </div>
        </div>
      )
    );
  }
}

export default MovieCard;

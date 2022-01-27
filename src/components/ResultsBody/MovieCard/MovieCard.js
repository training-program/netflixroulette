import React, { Component } from 'react';
import styles from './MovieCard.module.scss';
import PropTypes from 'prop-types';
import { MovieShape } from '@src/types';
import { IMG_PLACEHOLDER } from '@src/utils/constants';

class MovieCard extends Component {
  static propTypes = {
    ...MovieShape,
    onContextMenu: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = { hasLoadImgError: false };

    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  componentDidUpdate(prevProps) {
    const { poster_path } = this.props;
    if (prevProps.poster_path !== poster_path) {
      this.setState({ hasLoadImgError: false });
    }
  }
  handleOpenMenu(event) {
    event.preventDefault();
    const { onContextMenu, id } = this.props;
    onContextMenu(event, id);
  }
  handleError() {
    this.setState({ hasLoadImgError: true });
  }
  render() {
    const { title, tagline, poster_path, release_date } = this.props;
    const year = release_date ? new Date(release_date).getFullYear() : 'N/A';

    return (
      !!title && (
        <div className={styles.card} onContextMenu={this.handleOpenMenu}>
          <picture className={styles.poster}>
            {this.state.hasLoadImgError && (
              <img src={IMG_PLACEHOLDER} className={styles.poster__img} alt="Movie poster" />
            )}
            {!this.state.hasLoadImgError && (
              <img
                src={poster_path}
                className={styles.poster__img}
                alt="Movie poster"
                onError={this.handleError}
              />
            )}
          </picture>
          <div className={styles.info}>
            <div className={styles.info__left}>
              <span className={styles.info__title}>{title}</span>
              <span className={styles.info__tagline}>{tagline || title}</span>
            </div>
            <div className={styles.info__right}>
              <span className={styles.info__year}>{year}</span>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default MovieCard;

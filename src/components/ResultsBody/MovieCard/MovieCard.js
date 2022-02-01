import React, { Component } from 'react';
import { string, number, func } from 'prop-types';
import { IMG_PLACEHOLDER } from '@src/utils/constants';
import styles from './MovieCard.module.scss';

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = { hasLoadImgError: false };

    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { poster_path } = this.props;
    const { hasLoadImgError } = this.state;

    if (prevProps.poster_path !== poster_path && hasLoadImgError) {
      this.resetError();
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

  resetError() {
    this.setState({ hasLoadImgError: false });
  }

  render() {
    const { hasLoadImgError } = this.state;
    const {
      title, tagline, poster_path, release_date,
    } = this.props;
    const year = release_date ? new Date(release_date).getFullYear() : 'N/A';

    return (
      !!title && (
        <div className={styles.card} onContextMenu={this.handleOpenMenu}>
          <picture className={styles.poster}>
            {hasLoadImgError && (
              <img src={IMG_PLACEHOLDER} className={styles.poster__img} alt="Movie poster" />
            )}
            {!hasLoadImgError && (
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

MovieCard.propTypes = {
  id: number.isRequired,
  title: string.isRequired,
  tagline: string,
  release_date: string.isRequired,
  poster_path: string.isRequired,
  onContextMenu: func.isRequired,
};

MovieCard.defaultProps = {
  tagline: '',
};

export default MovieCard;

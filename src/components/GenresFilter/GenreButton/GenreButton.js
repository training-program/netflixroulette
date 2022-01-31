import React, { PureComponent } from 'react';
import { string, func, bool } from 'prop-types';
import styles from './GenreButton.module.scss';

class GenreButton extends PureComponent {
  handleClick = () => {
    const { onClick, genre } = this.props;
    onClick(genre);
  };

  render() {
    const { active, genre } = this.props;

    return (
      <button
        type="button"
        className={active ? styles.genreBtn_active : styles.genreBtn}
        onClick={this.handleClick}
      >
        {genre.toUpperCase()}
      </button>
    );
  }
}

GenreButton.propTypes = {
  active: bool.isRequired,
  genre: string.isRequired,
  onClick: func.isRequired,
};

export default GenreButton;

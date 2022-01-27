import React, { PureComponent } from 'react';
import styles from './GenreButton.module.scss';
import PropTypes from 'prop-types';

class GenreButton extends PureComponent {
  static propTypes = {
    genre: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  handleClick = () => {
    this.props.onClick(this.props.genre);
  };
  render() {
    const { active, genre } = this.props;

    return (
      <button
        className={active ? styles.genreBtn_active : styles.genreBtn}
        onClick={this.handleClick}
      >
        {genre.toUpperCase()}
      </button>
    );
  }
}

export default GenreButton;

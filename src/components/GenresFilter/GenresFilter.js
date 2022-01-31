import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { NAV_GENRES } from '@src/utils/constants';
import styles from './GenresFilter.module.scss';

import GenreButton from './GenreButton/GenreButton';

class GenresFilter extends Component {
  handleGenreChange = (genre) => {
    const { onChange, selected } = this.props;

    if (selected === genre) {
      return;
    }

    onChange({ genre });
  };

  render() {
    const { selected } = this.props;

    return (
      <div className={styles.genreButtons}>
        {NAV_GENRES.map((genre) => (
          <GenreButton
            key={genre}
            onClick={this.handleGenreChange}
            active={selected === genre}
            genre={genre}
          />
        ))}
      </div>
    );
  }
}

GenresFilter.propTypes = {
  onChange: func.isRequired,
  selected: string.isRequired,
};

export default GenresFilter;

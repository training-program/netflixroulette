import React, { PureComponent } from 'react';
import styles from './GenresFilter.module.scss';
import { string, func } from 'prop-types';
import { NAV_GENRES } from '@src/utils/constants';

import GenreButton from './GenreButton/GenreButton';

class GenresFilter extends PureComponent {
  static propTypes = {
    onChange: func.isRequired,
    selected: string.isRequired,
  };
  handleGenreChange = genre => {
    const { onChange, selected } = this.props;

    if (selected === genre) {
      return;
    }

    this.setState({ active: genre });
    onChange({ genre });
  };
  render() {
    return (
      <div className={styles.genreButtons}>
        {NAV_GENRES.map(genre => (
          <GenreButton
            key={genre}
            onClick={this.handleGenreChange}
            active={this.props.selected === genre}
            genre={genre}
          />
        ))}
      </div>
    );
  }
}

export default GenresFilter;

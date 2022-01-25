import React, { PureComponent } from 'react';
import styles from './GenresFilter.module.scss';
import PropTypes from 'prop-types';
import { NAV_GENRES } from 'Utils/constants';

import GenreButton from './GenreButton/GenreButton';

class GenresFilter extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    const active = NAV_GENRES[0];

    this.state = { active };

    this.handleGenreChange = this.handleGenreChange.bind(this);
  }
  handleGenreChange(genre) {
    if (this.state.active === genre) return;
    this.setState({ active: genre });
    this.props.onChange({ genre });
  }
  render() {
    return (
      <div className={styles.genreButtons}>
        {NAV_GENRES.map(genre => (
          <GenreButton
            key={genre}
            onClick={this.handleGenreChange}
            active={this.state.active === genre}
            genre={genre}
          />
        ))}
      </div>
    );
  }
}

export default GenresFilter;

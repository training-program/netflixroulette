import React, { PureComponent } from 'react';
import styles from './GenresFilter.module.scss';
import PropTypes from 'prop-types';

import GenreButton from './GenreButton/GenreButton';

class GenreFilter extends PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { active: 'All' };
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
        {this.props.options.map(genre => (
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

export default GenreFilter;

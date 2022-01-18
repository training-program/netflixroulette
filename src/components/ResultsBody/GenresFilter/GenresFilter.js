import React, { PureComponent } from 'react';
import styles from './GenresFilter.module.scss';
import PropTypes from 'prop-types';

const GenreButton = props => {
  function handleClick() {
    props.onClick(props.genre);
  }

  const classes = `${styles.genreBtn} ${props.active && styles.genreBtn_active}`.trimEnd();

  return (
    <button className={classes} onClick={handleClick}>
      {props.genre.toUpperCase()}
    </button>
  );
};

GenreButton.propTypes = {
  genre: PropTypes.string,
};

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
      <div className={styles.genreContainer}>
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

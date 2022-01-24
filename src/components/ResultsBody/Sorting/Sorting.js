import React, { Component } from 'react';
import styles from './Sorting.module.scss';
import PropTypes from 'prop-types';
import withShowToggling from 'Utils/hoc/withShowToggling';

const ListOption = ({ option, onClick }) => (
  <li className={styles.dropDown__option} onClick={onClick}>
    {option}
  </li>
);

class Sorting extends Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    const selectedOption = props.value ?? props.options[0];

    this.state = { selectedOption };

    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(event) {
    this.props.onToggle();

    const sortBy = event.target.innerHTML;

    if (!(this.state.selectedOption === sortBy)) {
      this.setState({ selectedOption: sortBy });
      this.props.onChange({ sortBy });
    }
  }
  render() {
    const { onToggle, focusedRef, options, showElement } = this.props;
    return (
      <div className={styles.sorting}>
        <label htmlFor="sortby-select" className={styles.sorting__label}>
          SORT BY
        </label>
        <div ref={focusedRef} className={styles.dropDown}>
          <input
            className={showElement ? styles.dropDown__select_show : styles.dropDown__select}
            type="button"
            value={this.state.selectedOption}
            id="sortby-select"
            name="sortby-select"
            onClick={onToggle}
          />
          {showElement && (
            <ul className={styles.dropDown__list}>
              {options.map(option => (
                <ListOption key={option} option={option} onClick={this.handleSelect} />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default withShowToggling(Sorting);

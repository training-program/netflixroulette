import React, { Component } from 'react';
import styles from './Sorting.module.scss';
import { func, object, bool } from 'prop-types';
import withShowToggling from 'Utils/hoc/withShowToggling';
import { SORTBY } from 'Utils/constants';

import SortingOption from './SortingOption';

class Sorting extends Component {
  static propTypes = {
    focusedRef: object.isRequired,
    showElement: bool.isRequired,
    onToggle: func.isRequired,
    onChange: func.isRequired,
  };
  constructor(props) {
    super(props);

    const selectedOption = SORTBY[0];

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
    const { onToggle, focusedRef, showElement } = this.props;
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
              {SORTBY.map(option => (
                <SortingOption key={option} option={option} onClick={this.handleSelect} />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default withShowToggling(Sorting);

import React, { Component } from 'react';
import styles from './Sorting.module.scss';
import { func, object, bool, string } from 'prop-types';
import withShowToggling from '@src/hoc/withShowToggling';
import { SORT_BY } from '@src/utils/constants';

class Sorting extends Component {
  static propTypes = {
    focusedRef: object.isRequired,
    showElement: bool.isRequired,
    onToggle: func.isRequired,
    onChange: func.isRequired,
    selected: string.isRequired,
  };
  handleSelect = ({ target: { innerHTML } }) => {
    const { onToggle, onChange, selected } = this.props;

    onToggle();

    if (selected === innerHTML) {
      return;
    }

    onChange({ sortBy: innerHTML });
  };
  render() {
    const { onToggle, focusedRef, showElement, selected } = this.props;
    return (
      <div className={styles.sorting}>
        <label htmlFor="sortby-select" className={styles.sorting__label}>
          SORT BY
        </label>
        <div ref={focusedRef} className={styles.dropDown}>
          <input
            className={showElement ? styles.dropDown__select_show : styles.dropDown__select}
            type="button"
            value={selected}
            id="sortby-select"
            name="sortby-select"
            onClick={onToggle}
          />
          {showElement && (
            <ul className={styles.dropDown__list}>
              {SORT_BY.map(option => (
                <li key={option} className={styles.dropDown__option} onClick={this.handleSelect}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default withShowToggling(Sorting);

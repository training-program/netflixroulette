import React, { Component } from 'react';
import { func, bool, string } from 'prop-types';
import { RefProp } from '@src/types';
import withShowToggling from '@src/hoc/withShowToggling';
import { SORT_BY } from '@src/utils/constants';
import styles from './Sorting.module.scss';

class Sorting extends Component {
  handleSelect = ({ target: { innerHTML } }) => {
    const { onToggle, onChange, selected } = this.props;

    onToggle();

    if (selected === innerHTML) {
      return;
    }

    onChange({ sortBy: innerHTML });
  };

  render() {
    const {
      onToggle, focusedRef, showElement, selected,
    } = this.props;

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
              {SORT_BY.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    className={styles.dropDown__option}
                    onClick={this.handleSelect}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

Sorting.propTypes = {
  focusedRef: RefProp.isRequired,
  showElement: bool.isRequired,
  onToggle: func.isRequired,
  onChange: func.isRequired,
  selected: string.isRequired,
};

export default withShowToggling(Sorting);

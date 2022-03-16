import React from 'react';
import { useNavigate } from 'react-router-dom';
import useToggle from '@src/hooks/useToggle';
import { SORT_BY_FILTERS } from '@src/utils/constants';
import { SortQueries, RootState } from '@src/types/';
import { selectSortBy } from '@src/store/selectors/movies.selectors';
import { connect } from 'react-redux';
import styles from './Sorting.module.scss';
import { SortingProps } from './Sorting.types';

const Sorting = ({ selected }: SortingProps) => {
  const { toggleRef, showElement, onToggle } = useToggle();

  const navigate = useNavigate();

  const handleSelect = (sortBy: SortQueries) => () => {
    onToggle();

    if (selected !== sortBy) {
      navigate(`?sortBy=${sortBy}`);
    }
  };

  return (
    <div className={styles.sorting}>
      <label htmlFor="sortby-select" className={styles.sorting__label}>
        SORT BY
      </label>
      <div ref={toggleRef} className={styles.dropDown}>
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
            {SORT_BY_FILTERS.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={styles.dropDown__option}
                  onClick={handleSelect(option)}
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
};

const mapStateToProps = (state: RootState) => ({ selected: selectSortBy(state) });

export default connect(mapStateToProps)(Sorting);

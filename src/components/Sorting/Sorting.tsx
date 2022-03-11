import React from 'react';
import useToggle from '@src/hooks/useToggle';
import { SORT_BY } from '@src/utils/constants';
import { SortQueries, RootState } from '@src/types/';
import { fetchMovies } from '@src/store/actionCreators/movies';
import { selectSortBy } from '@src/store/selectors/movies.selectors';
import { connect } from 'react-redux';
import styles from './Sorting.module.scss';
import { SortingProps } from './Sorting.types';

const Sorting = ({ selected, filterMovies }: SortingProps) => {
  const { toggleRef, showElement, onToggle } = useToggle();

  const handleSelect = (sortBy: SortQueries) => () => {
    onToggle();

    if (selected !== sortBy) {
      filterMovies({ sortBy });
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
            {SORT_BY.map((option) => (
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

const mapDispatchToProps = { filterMovies: fetchMovies };

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);

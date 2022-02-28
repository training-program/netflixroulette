import React from 'react';
import useUpdateMovies from '@src/hooks/useUpdateMovies';
import useToggle from '@src/hooks/useToggle';
import { SORT_BY } from '@src/utils/constants';
import { SortQueries } from '@src/types/';
import styles from './Sorting.module.scss';

const Sorting = () => {
  const [toggleRef, showElement, onToggle] = useToggle();
  const { sortBy, updateMovies } = useUpdateMovies();

  const handleSelect = (option: SortQueries) => {
    onToggle();

    if (sortBy !== option) {
      updateMovies({ sortBy: option });
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
          value={sortBy}
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
                  onClick={() => handleSelect(option)}
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

export default Sorting;

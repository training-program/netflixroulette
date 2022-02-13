import * as React from 'react';
import { SORT_BY } from '@src/utils/constants';
import { SortBy } from '@src/types/';
import useToggle from '@src/hooks/useToggle';
import styles from './Sorting.module.scss';

type Props = {
  onChange: React.Dispatch<React.SetStateAction<SortBy>>;
  selected: string;
};

const Sorting = ({ onChange, selected }: Props) => {
  const [toggleRef, showElement, onToggle] = useToggle();

  const handleSelect = (option: SortBy) => {
    onToggle();

    if (selected === option) {
      return;
    }

    onChange(option);
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

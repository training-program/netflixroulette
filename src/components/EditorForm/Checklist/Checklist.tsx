import React, { ChangeEvent } from 'react';
import useToggle from '@src/hooks/useToggle';
import { GENRES } from '@src/utils/constants';
import { Genre } from '@src/types';
import { ChecklistProps } from './Checklist.types';
import styles from './Checklist.module.scss';

const Checklist = ({
  values, name, placeholder, onChange,
}: ChecklistProps) => {
  const [toggleRef, showElement, onToggle] = useToggle();

  const handleChange = (
    genre: Genre,
    { currentTarget: { checked } }: ChangeEvent<HTMLInputElement>,
  ) => {
    onChange({ ...values, [genre]: checked });
  };

  return (
    <div ref={toggleRef} className={styles.dropDown}>
      <button
        className={showElement ? styles.dropDown__btn_open : styles.dropDown__btn}
        type="button"
        name={name}
        onClick={onToggle}
      >
        {placeholder}
      </button>
      {showElement && (
        <ul className={styles.dropDown__list}>
          {GENRES.map((genre) => (
            <li key={genre} className={styles.dropDown__option}>
              <input
                type="checkbox"
                id={genre}
                value={genre}
                onChange={(event) => handleChange(genre, event)}
                checked={!!values[genre]}
                className={styles.dropDown__checkbox}
              />
              <label className={styles.dropDown__label} htmlFor={genre}>
                {genre}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Checklist;

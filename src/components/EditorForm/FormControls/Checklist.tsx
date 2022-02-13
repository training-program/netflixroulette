import React, { useState, useEffect } from 'react';
import { GENRES } from '@src/utils/constants';
import { GenresChecklist } from '@src/types/';

import useToggle from '@src/hooks/useToggle';
import styles from './Checklist.module.scss';

type Props = {
  values: GenresChecklist;
  name: string;
  placeholder: string;
  onChange: (value: GenresChecklist) => void;
};

let elementWasClosed = false;

const Checklist = ({
  values, name, placeholder, onChange,
}: Props) => {
  const [options, setOptions] = useState(() => ({ ...values }));
  const [toggleRef, showElement, onToggle] = useToggle();

  useEffect(() => {
    if (!showElement && elementWasClosed) {
      onChange(options);
    }

    elementWasClosed = showElement;
  }, [options, onChange, showElement]);

  const handleChange = ({
    currentTarget: { value, checked },
  }: React.FormEvent<HTMLInputElement>) => {
    setOptions((oldOptions) => ({ ...oldOptions, [value]: checked }));
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
                onChange={handleChange}
                checked={!!options[genre]}
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

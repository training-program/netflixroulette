import React from 'react';
import { Field, useField } from 'formik';
import useToggle from '@src/hooks/useToggle';
import { GENRES } from '@src/utils/constants';
import { EditorSelectProps } from './EditorSelect.types';
import styles from './EditorSelect.module.scss';
import FormField from '../FormField/FormField';

const EditorSelect = ({ label, placeholder, name }: EditorSelectProps) => {
  const { toggleRef, showElement, onToggle } = useToggle();
  const { error, touched } = useField(name)[1];

  return (
    <FormField label={label} error={error} touched={touched}>
      <div ref={toggleRef} className={styles.dropDown}>
        <button
          className={showElement ? styles.dropDown__btn_open : styles.dropDown__btn}
          type="button"
          onClick={onToggle}
        >
          {placeholder}
        </button>
        {showElement && (
          <ul className={styles.dropDown__list}>
            {GENRES.map((genre) => (
              <li key={genre} className={styles.dropDown__option}>
                <Field
                  type="checkbox"
                  name={name}
                  value={genre}
                  className={styles.dropDown__checkbox}
                  id={genre}
                />
                <label className={styles.dropDown__label} htmlFor={genre}>
                  {genre}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </FormField>
  );
};

export default EditorSelect;

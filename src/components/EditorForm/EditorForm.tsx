import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { BaseMovie, RootState } from '@src/types';
import { useAppDispatch } from '@src/hooks/redux';
import { DEFAULT_MOVIE, STATUSES } from '@src/utils/constants';
import useHandleClose from '@src/hooks/useHandleClose';
import { EditorFormProps } from './EditorForm.types';
import validate from './EditorForm.helpers';
import styles from './EditorForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';
import ModalSuccess from '../ModalSuccess/ModalSuccess';
import EditorInput from './EditorInput/EditorInput';
import EditorTextarea from './EditorTextarea/EditorTextarea';
import EditorSelect from './EditorSelect/EditorSelect';

const { ERROR, SUCCESS, INITIAL } = STATUSES;

const EditorForm = ({ action, variant: { successMessage, legend } }: EditorFormProps) => {
  const { id } = useParams();
  const initialMovie =
    useSelector(({ movies: { movies } }: RootState) =>
      movies.find((movie) => movie.id === Number(id)),
    ) || DEFAULT_MOVIE;
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (fields: BaseMovie, { setStatus }: FormikHelpers<BaseMovie>) =>
      dispatch(action(fields))
        .then(() => setStatus(SUCCESS))
        .catch(() => setStatus(ERROR)),
    [dispatch, action],
  );

  const handleClose = useHandleClose();

  return (
    <Formik
      initialValues={initialMovie}
      validate={validate}
      onSubmit={handleSubmit}
      initialStatus={INITIAL}
    >
      {({ isValid, isSubmitting, status: { success, error } }) =>
        success ? (
          <ModalSuccess message={successMessage} onClose={handleClose} />
        ) : (
          <Dialog onClose={handleClose}>
            <Form className={isSubmitting ? styles.form_blur : styles.form}>
              <fieldset name="movie editor" className={styles.form__fieldset}>
                <legend className={styles.form__legend}>{legend}</legend>
                <div className={styles.form__top}>
                  <div className={styles.form__left}>
                    <EditorInput
                      type="text"
                      name="title"
                      label="TITLE"
                      placeholder="Title"
                      className={styles.field__textInput}
                    />
                    <EditorInput
                      type="text"
                      name="poster_path"
                      label="MOVIE URL"
                      placeholder="https://"
                      className={styles.field__textInput}
                    />
                    <EditorSelect label="GENRE" placeholder="Select Genre" name="genres" />
                  </div>

                  <div className={styles.form__right}>
                    <EditorInput
                      type="date"
                      name="release_date"
                      label="RELEASE DATE"
                      className={styles.field__datePicker}
                    />
                    <EditorInput
                      type="number"
                      name="vote_average"
                      label="RATING"
                      placeholder="7.8"
                      className={styles.field__number}
                    />
                    <EditorInput
                      type="number"
                      name="runtime"
                      label="RUNTIME"
                      placeholder="minutes"
                      className={styles.field__number}
                    />
                  </div>
                </div>
                <EditorTextarea
                  cols={30}
                  rows={10}
                  name="overview"
                  label="OVERVIEW"
                  placeholder="Movie description"
                  className={styles.field__textarea}
                />
              </fieldset>
              <div className={styles.form__buttons}>
                {error && (
                  <span className={styles.form__error}>
                    Oops! An error occurred. The changes cannot be saved.
                  </span>
                )}
                <input type="reset" className={styles.form__resetBtn} value="RESET" />
                <button
                  type="submit"
                  className={!isValid ? styles.form__submitBtn_disabled : styles.form__submitBtn}
                >
                  SUBMIT
                </button>
              </div>
            </Form>
            {isSubmitting && <Spinner fullscreen />}
          </Dialog>
        )
      }
    </Formik>
  );
};

export default EditorForm;

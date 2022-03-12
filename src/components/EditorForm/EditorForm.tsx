import React, { useCallback, useMemo } from 'react';
import { Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import API from '@src/api/api';
import useAbortRequest from '@src/hooks/useAbortRequest';
import { BaseMovie } from '@src/types';
import { STATUSES, ERROR_MESSAGES } from '@src/utils/constants';
import { EditorFormProps } from './EditorForm.types';
import styles from './EditorForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';
import ModalSuccess from '../ModalSuccess/ModalSuccess';
import EditorInput from './EditorInput/EditorInput';
import EditorTextarea from './EditorTextarea/EditorTextarea';
import EditorSelect from './EditorSelect/EditorSelect';

const { REQUIRED, MIN_0, MAX_100, NOT_LINK } = ERROR_MESSAGES;
const { ERROR, SUCCESS, INITIAL } = STATUSES;

const EditorForm = ({
  movie,
  onClose,
  onSubmit,
  variant: { successMessage, legend, apiMethod },
}: EditorFormProps) => {
  const { controller, request } = useMemo(() => API.send(apiMethod), [apiMethod]);
  useAbortRequest(controller);

  const handleSubmit = useCallback(
    (fields: BaseMovie, { setStatus }: FormikHelpers<BaseMovie>) =>
      request(fields)
        .then((response) => {
          onSubmit(response);
          setStatus(SUCCESS);
        })
        .catch(() => setStatus(ERROR)),
    [onSubmit, request],
  );

  const validate = ({
    title,
    poster_path,
    genres,
    release_date,
    vote_average,
    runtime,
    overview,
  }: BaseMovie) => {
    const errors: FormikErrors<BaseMovie> = {};

    if (!title) {
      errors.title = REQUIRED;
    }

    if (!poster_path) {
      errors.poster_path = REQUIRED;
    } else if (!/^https?:\/\/./.test(poster_path)) {
      errors.poster_path = NOT_LINK;
    }

    if (!genres.length) {
      errors.genres = REQUIRED;
    }

    if (!release_date) {
      errors.release_date = REQUIRED;
    }

    if (typeof vote_average !== 'number') {
      errors.vote_average = REQUIRED;
    } else if (vote_average < 0) {
      errors.vote_average = MIN_0;
    } else if (vote_average > 100) {
      errors.vote_average = MAX_100;
    }

    if (typeof runtime !== 'number') {
      errors.runtime = REQUIRED;
    } else if (runtime < 0) {
      errors.runtime = MIN_0;
    }

    if (!overview) {
      errors.overview = REQUIRED;
    }

    return errors;
  };

  return (
    <Formik
      initialValues={movie}
      validate={validate}
      onSubmit={handleSubmit}
      initialStatus={INITIAL}
    >
      {({ isValid, isSubmitting, status: { success, error } }) =>
        success ? (
          <ModalSuccess message={successMessage} onClose={onClose} />
        ) : (
          <Dialog onClose={onClose}>
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

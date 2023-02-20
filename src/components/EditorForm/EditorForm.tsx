import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import { connect } from 'react-redux';
import API from '@src/api/api';
import { BaseMovie, RootState } from '@src/types';
import { DEFAULT_MOVIE, STATUSES } from '@src/utils/constants';
import { selectMovies } from '@src/store/selectors/movies.selectors';
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

const EditorForm = ({
  movies,
  onSubmit,
  variant: { successMessage, legend, apiMethod },
}: EditorFormProps) => {
  const { request } = useMemo(() => API.send(apiMethod), [apiMethod]);

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

  const handleClose = useHandleClose();

  const { id } = useParams();

  const movie: BaseMovie = id
    ? movies.find((item) => item.id === Number(id)) || DEFAULT_MOVIE
    : DEFAULT_MOVIE;

  return (
    <Formik
      initialValues={movie}
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

const mapStateToProps = (state: RootState) => ({ movies: selectMovies(state) });

export default connect(mapStateToProps)(EditorForm);

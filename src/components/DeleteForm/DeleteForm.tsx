import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import API from '@src/api/api';
import useAbortRequest from '@src/hooks/useAbortRequest';
import { DeleteFormProps } from './DeleteForm.types';
import styles from './DeleteForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';

const INITIAL_VALUES = {};

const DeleteForm = ({ onClose, onSubmit, deletedMovieId }: DeleteFormProps) => {
  const { controller, request } = API.delete;
  useAbortRequest(controller);

  const handleSubmit = (_: {}, { setStatus }: FormikHelpers<{}>) =>
    request(deletedMovieId)
      .then(() => {
        onSubmit(deletedMovieId);
        onClose();
      })
      .catch(() => setStatus(true));

  return (
    <Dialog onClose={onClose}>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        {({ isSubmitting, status: error }) => (
          <>
            <div className={isSubmitting ? styles.deleteFormWrap_blur : styles.deleteFormWrap}>
              <h1 className={styles.deleteFormTitle}>DELETE MOVIE</h1>
              <Form className={styles.deleteForm}>
                <span className={styles.deleteForm__prompt}>
                  Are you sure you want to delete this movie?
                </span>
                {error && (
                  <span className={styles.deleteForm__error}>
                    Oops! An error occurred. The movie was not deleted.
                  </span>
                )}
                <button type="submit" className={styles.submitBtn}>
                  CONFIRM
                </button>
              </Form>
            </div>
            {isSubmitting && <Spinner fullscreen />}
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default DeleteForm;

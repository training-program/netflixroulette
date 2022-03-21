import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import API from '@src/api/api';
import useAbortRequest from '@src/hooks/useAbortRequest';
import useHandleClose from '@src/hooks/useHandleClose';
import { DeleteFormProps } from './DeleteForm.types';
import styles from './DeleteForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';

const INITIAL_VALUES = {};

const DeleteForm = ({ onSubmit }: DeleteFormProps) => {
  const { controller, request } = API.delete;
  useAbortRequest(controller);

  const { id } = useParams();

  const handleClose = useHandleClose();

  const handleSubmit = (_: {}, { setStatus }: FormikHelpers<{}>) =>
    request(Number(id))
      .then(() => {
        onSubmit(Number(id));
        handleClose();
      })
      .catch(() => setStatus(true));

  return (
    <Dialog onClose={handleClose}>
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

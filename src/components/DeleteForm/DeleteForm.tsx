import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import useHandleClose from '@src/hooks/useHandleClose';
import { useAppDispatch } from '@src/hooks/redux';
import { deleteMovie } from '@src/store/actionCreators/movies';

import styles from './DeleteForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';
import Button from '../common/Button/Button';

const INITIAL_VALUES = {};

const DeleteForm = () => {
  const { id } = useParams();
  const handleClose = useHandleClose();
  const dispatch = useAppDispatch();

  const handleSubmit = (_: {}, { setStatus }: FormikHelpers<{}>) =>
    dispatch(deleteMovie(Number(id)))
      .then(() => handleClose())
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
                <Button type="submit">CONFIRM</Button>
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

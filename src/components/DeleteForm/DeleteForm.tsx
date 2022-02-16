import React, { useState, SyntheticEvent } from 'react';
import API from '@src/api/api';
import { DeleteFormProps } from './DeleteForm.types';
import styles from './DeleteMovieForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';

const ModalDelete = ({
  onSubmit, onClose, fetchApi, id,
}: DeleteFormProps) => {
  const [isFetching, setFetching] = useState(false);
  const [hasError, setError] = useState(false);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (typeof id !== 'number') {
      setError(true);
      return;
    }

    setFetching(true);
    fetchApi(id)
      .then(() => {
        onClose();
        onSubmit();
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
        setFetching(false);
        setError(true);
      });
  };

  const handleClose = () => {
    if (isFetching) {
      API.tryToCancel().catch(
        console.error, // eslint-disable-line
      );
    } else {
      onClose();
    }
  };

  return (
    <Dialog onClose={handleClose}>
      <div className={isFetching ? styles.deleteFormWrap_blur : styles.deleteFormWrap}>
        <h1 className={styles.deleteFormTitle}>DELETE MOVIE</h1>
        <form className={styles.deleteForm} onSubmit={handleSubmit}>
          <span className={styles.deleteForm__prompt}>
            Are you sure you want to delete this movie?
          </span>
          {hasError && (
            <span className={styles.deleteForm__error}>
              Oops! An error occurred. The movie was not deleted.
            </span>
          )}
          <button type="submit" className={styles.submitBtn}>
            CONFIRM
          </button>
        </form>
      </div>
      {isFetching && <Spinner fullscreen />}
    </Dialog>
  );
};

export default ModalDelete;

import React, { SyntheticEvent } from 'react';
import useFetch from '@src/hooks/useFetch';
import { DeleteFormProps } from './DeleteForm.types';
import styles from './DeleteMovieForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';

const ModalDelete = ({ onClose, onCloseView, id }: DeleteFormProps) => {
  const [{ loading, error }, doFetch] = useFetch(() => {
    onCloseView();
    onClose();
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    doFetch({ type: 'DELETE', payload: id });
  };

  return (
    <Dialog onClose={onClose}>
      <div className={loading ? styles.deleteFormWrap_blur : styles.deleteFormWrap}>
        <h1 className={styles.deleteFormTitle}>DELETE MOVIE</h1>
        <form className={styles.deleteForm} onSubmit={handleSubmit}>
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
        </form>
      </div>
      {loading && <Spinner fullscreen />}
    </Dialog>
  );
};

export default ModalDelete;

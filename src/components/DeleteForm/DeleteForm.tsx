import React, { SyntheticEvent, useCallback } from 'react';
import useSendRequest from '@src/hooks/useSendRequest';
import API from '@src/api/api';
import useAbortRequest from '@src/hooks/useAbortRequest';
import { connect, ConnectedProps } from 'react-redux';
import { deleteMovie } from '@src/store/actionCreators/movies';
import { DeleteFormProps } from './DeleteForm.types';
import styles from './DeleteForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';

const { controller, request } = API.delete;
const connector = connect(null, { onSubmit: deleteMovie });

const DeleteForm = ({
  onClose,
  onSubmit,
  deletedMovieId,
}: DeleteFormProps & ConnectedProps<typeof connector>) => {
  const onSuccess = useCallback(() => {
    onSubmit(deletedMovieId);
    onClose();
  }, [onSubmit, onClose, deletedMovieId]);

  const {
    status: { loading, error },
    sendRequest,
  } = useSendRequest(request, onSuccess);

  useAbortRequest(loading, controller);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    sendRequest(deletedMovieId);
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

export default connector(DeleteForm);

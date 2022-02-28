import React, { SyntheticEvent, useContext, useCallback } from 'react';
import useSendRequest from '@src/hooks/useSendRequest';
import { AppContext } from '@src/context/app.context';
import API from '@src/api/api';
import { ContextActionType } from '@src/types';
import useAbortRequest from '@src/hooks/useAbortRequest';
import { DeleteFormProps } from './DeleteForm.types';
import styles from './DeleteForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';

const { controller, request } = API.delete;

const DeleteForm = ({ onClose, onCloseMovieDetails, deletedMovieId }: DeleteFormProps) => {
  const { dispatchMovieContext } = useContext(AppContext);

  const onSuccess = useCallback(() => {
    dispatchMovieContext({ type: ContextActionType.DELETE, payload: deletedMovieId });
    onCloseMovieDetails();
    onClose();
  }, [dispatchMovieContext, onCloseMovieDetails, onClose, deletedMovieId]);

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

export default DeleteForm;

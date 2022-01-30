import React, { Component } from 'react';
import { func, number } from 'prop-types';
import API from '@src/api/api';
import styles from './DeleteMovieForm.module.scss';

import Dialog from '../Dialog/Dialog.jsx';
import Spinner from '../Spinner/Spinner.jsx';

class ModalDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      hasError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit(event) {
    const {
      onSubmit, onClose, fetchApi, id,
    } = this.props;
    event.preventDefault();

    this.setState({ isFetching: true });

    fetchApi(id)
      .then(() => {
        onClose();
        onSubmit(id);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
        this.setState({ hasError: true, isFetching: false });
      });
  }

  handleClose() {
    const { isFetching } = this.state;
    const { onClose } = this.props;

    if (isFetching) {
      API.tryToCancel().catch(
        console.error, // eslint-disable-line
      );
    } else onClose();
  }

  render() {
    const { hasError, isFetching } = this.state;

    return (
      <Dialog onClose={this.handleClose}>
        <div className={isFetching ? styles.deleteFormWrap_blur : styles.deleteFormWrap}>
          <h1 className={styles.deleteFormTitle}>DELETE MOVIE</h1>
          <form className={styles.deleteForm} onSubmit={this.handleSubmit}>
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
  }
}

ModalDelete.propTypes = {
  onSubmit: func.isRequired,
  onClose: func.isRequired,
  id: number.isRequired,
  fetchApi: func.isRequired,
};

export default ModalDelete;

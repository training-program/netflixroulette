import React, { Component } from 'react';
import styles from './DeleteMovieForm.module.scss';
import { func, number } from 'prop-types';
import API from '@src/api/api';

import Dialog from '../Dialog/Dialog';
import Spinner from '../../Spinner/Spinner';

class ModalDelete extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    onClose: func.isRequired,
    id: number.isRequired,
    fetchApi: func.isRequired,
  };
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
    const { onSubmit, onClose, fetchApi, id } = this.props;
    event.preventDefault();

    this.setState({ isFetching: true });

    fetchApi(id)
      .then(() => {
        onSubmit(id);
        onClose();
      })
      .catch(error => {
        console.error(error);
        this.setState({ hasError: true, isFetching: false });
      });
  }
  handleClose() {
    if (this.state.isFetching) API.tryToCancel().catch(console.error);
    else this.props.onClose();
  }
  render() {
    const { hasError, isFetching } = this.state;

    return (
      <Dialog onClose={this.handleClose}>
        <form
          className={isFetching ? styles.deleteForm_blur : styles.deleteForm}
          onSubmit={this.handleSubmit}
        >
          <label className={styles.deleteForm__label}>DELETE MOVIE</label>
          <span className={styles.deleteForm__prompt}>
            Are you sure you want to delete this movie?
          </span>
          {hasError && (
            <span className={styles.deleteForm__error}>
              Oops! An error occurred. The movie was not deleted.
            </span>
          )}
          <input type="submit" value="CONFIRM" className={styles.submitBtn} />
        </form>
        {isFetching && <Spinner fullscreen />}
      </Dialog>
    );
  }
}

export default ModalDelete;

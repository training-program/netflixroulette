import React, { Component } from 'react';
import styles from './DeleteMovieForm.module.scss';
import { func, number } from 'prop-types';

class ModalDelete extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    onClose: func.isRequired,
    id: number.isRequired,
  };
  handleSubmit = e => {
    const { onSubmit, onClose, id } = this.props;
    e.preventDefault();
    onSubmit(id);
    onClose();
  };
  render() {
    return (
      <form className={styles.deleteForm} onSubmit={this.handleSubmit}>
        <label className={styles.deleteForm__label}>DELETE MOVIE</label>
        <span className={styles.deleteForm__prompt}>
          Are you sure you want to delete this movie?
        </span>
        <input type="submit" value="CONFIRM" className={styles.submitBtn} />
      </form>
    );
  }
}

export default ModalDelete;

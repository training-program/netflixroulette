import React from 'react';
import styles from './DeleteMovieForm.module.scss';

const ModalDelete = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(props.id);
    props.handleClose();
  };

  return (
    <form className={styles.modalDelete__form} onSubmit={handleSubmit}>
      <label>DELETE MOVIE</label>
      <span>Are you sure you want to delete this movie?</span>
      <input type="submit" value="CONFIRM" />
    </form>
  );
};

export default ModalDelete;

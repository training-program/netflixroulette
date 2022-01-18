import React from 'react';

import Dialog from './Dialog/Dialog';
import DeleteMovieForm from './DeleteMovieForm/DeleteMovieForm';

const ModalEdit = props => {
  const handleClick = () => props.handleClose();

  return (
    <Dialog onClick={handleClick}>
      <DeleteMovieForm {...props} />
    </Dialog>
  );
};

export default ModalEdit;

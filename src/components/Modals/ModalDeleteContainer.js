import React from 'react';

import Dialog from './Dialog/Dialog';
import DeleteMovieForm from './DeleteMovieForm/DeleteMovieForm';

const ModalEdit = props => {
  return (
    <Dialog onClose={props.onClose}>
      <DeleteMovieForm {...props} />
    </Dialog>
  );
};

export default ModalEdit;

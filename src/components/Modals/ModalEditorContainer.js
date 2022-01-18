import React from 'react';

import Dialog from './Dialog/Dialog';
import EditorForm from './EditorForm/EditorForm';

const ModalEdit = props => {
  const handleClick = () => props.handleClose();

  return (
    <Dialog onClick={handleClick}>
      <EditorForm {...props} />
    </Dialog>
  );
};

export default ModalEdit;

import React from 'react';

import Dialog from './Dialog/Dialog';
import EditorForm from './EditorForm/EditorForm';

const ModalEdit = props => {
  return (
    <Dialog onClose={props.onClose}>
      <EditorForm {...props} />
    </Dialog>
  );
};

export default ModalEdit;

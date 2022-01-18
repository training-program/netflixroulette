import React, { PureComponent } from 'react';
import styles from './ContextMenu.module.scss';

class ContextMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.ref.current.focus();
  }
  handleBlur(e) {
    if (e.relatedTarget) return;
    this.props.handleClose();
  }
  handleClick(handleOpen) {
    handleOpen(this.props.id);
    this.props.handleClose();
  }
  render() {
    const { coordX, coordY, handleOpenEdit, handleOpenDelete, handleClose } = this.props;
    const x = Math.min(innerWidth - 210, coordX);
    const y = Math.min(window.pageYOffset + innerHeight - 115, coordY);

    return (
      <div
        ref={this.ref}
        className={styles.menu}
        style={{ left: x, top: y }}
        onBlur={e => this.handleBlur(e)}
        tabIndex={1}
      >
        <a className={styles.closeButton} onClick={handleClose} />
        <button className={styles.edit} onClick={() => this.handleClick(handleOpenEdit)}>
          Edit
        </button>
        <button className={styles.delete} onClick={() => this.handleClick(handleOpenDelete)}>
          Delete
        </button>
      </div>
    );
  }
}

export default ContextMenu;

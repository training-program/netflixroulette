import React, { Component } from 'react';
import styles from './Sorting.module.scss';
import PropTypes from 'prop-types';

class Sorting extends Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    const selectedOption = props.value ?? props.options[0];
    this.state = { listIsShow: false, selectedOption };
    this.closeList = this.closeList.bind(this);
  }
  handleClick(e) {
    if (this.state.listIsShow) return;
    this.setState({ listIsShow: true });
    e.stopPropagation();
    document.addEventListener('click', this.closeList);
  }
  closeList() {
    this.setState({ listIsShow: false });
    document.removeEventListener('click', this.closeList);
  }
  handleSelect(sortBy) {
    this.closeList();
    if (this.state.selectedOption === sortBy) return;
    this.setState({ selectedOption: sortBy });
    this.props.onChange({ sortBy });
  }
  render() {
    const inputClasses = `${styles.dropDown__select} ${
      this.state.listIsShow ? styles.dropDown__select_show : ''
    }`.trimEnd();

    return (
      <div className={styles.sorting}>
        <label htmlFor="sortby-select">SORT BY</label>
        <div className={styles.dropDown}>
          <input
            className={inputClasses}
            type="button"
            value={this.state.selectedOption + '      '}
            id="sortby-select"
            name="sortby-select"
            onClick={e => this.handleClick(e)}
          />
          {this.state.listIsShow && (
            <ul className={styles.dropDown__list}>
              {this.props.options.map(option => (
                <li
                  className={styles.dropDown__option}
                  key={option}
                  onClick={() => this.handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Sorting;

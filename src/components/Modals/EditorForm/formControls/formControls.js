import React, { Component } from 'react';
import styles from './formControls.module.scss';

const FormField = props => (
  <div className={styles.field}>
    <label htmlFor={props.id} className={styles.field__label}>
      {props.label}
    </label>
    {props.children}
    {props.hasError && <span className={styles.field__warn}>{props.warnMessage}</span>}
  </div>
);

class CheckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listIsShow: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.ref = React.createRef();
  }
  handleBlur(e) {
    if (this.ref.current.contains(e.relatedTarget)) return;
    this.setState({ listIsShow: false });
    this.props.onBlur(e, this.props.name);
  }
  handleToggleClick() {
    this.setState(({ listIsShow }) => {
      if (!listIsShow) this.ref.current.focus();

      return {
        listIsShow: !listIsShow,
      };
    });
  }
  handleSelect(e) {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const values = new Set(this.props.value);

    if (isChecked) values.add(value);
    else values.delete(value);

    this.props.onInput([...values.values()], this.props.name);
  }
  render() {
    const { id, options, name, value: values, placeholder } = this.props;

    const inputClasses = `${styles.dropDown__input} ${
      this.state.listIsShow ? styles.dropDown__input_show : ''
    }`.trimEnd();

    return (
      <div tabIndex={1} ref={this.ref} className={styles.dropDown} onBlur={this.handleBlur}>
        <input
          className={inputClasses}
          type="button"
          value={placeholder}
          id={id}
          name={name}
          onClickCapture={this.handleToggleClick}
        />
        {this.state.listIsShow && (
          <ul className={styles.dropDown__list}>
            {options.map(option => (
              <li className={styles.dropDown__option} key={option}>
                <input
                  id={id + option}
                  type="checkbox"
                  value={option}
                  onChange={this.handleSelect}
                  checked={values.includes(option)}
                  className={styles.dropDown__checkbox}
                />
                <label className={styles.dropDown__label} htmlFor={id + option}>
                  {option}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const Input = props => <input type="text" className={styles.field__textInput} {...props} />;
const DatePicker = props => <input type="date" className={styles.field__datePicker} {...props} />;
const TextArea = props => (
  <textarea type="text" cols="30" rows="10" className={styles.field__textarea} {...props} />
);

const createField = (InputType, { label, id, warnMessage, touched, ...props }) => {
  const domId = `${props.name}-${id}`;
  const hasError = touched && warnMessage;

  return (
    <FormField id={domId} hasError={hasError} label={label} warnMessage={warnMessage}>
      <InputType id={domId} {...props} />
    </FormField>
  );
};

const InputField = props => createField(Input, props);
const DatePickerField = props => createField(DatePicker, props);
const TextAreaField = props => createField(TextArea, props);
const CheckListField = props => createField(CheckList, props);

export { InputField, DatePickerField, TextAreaField, CheckListField };

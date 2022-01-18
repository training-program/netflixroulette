import React, { Component } from 'react';
import styles from './EditorForm.module.scss';
import PropTypes from 'prop-types';

import {
  InputField,
  DatePickerField,
  TextAreaField,
  CheckListField,
} from './formControls/formControls.js';

const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Romance',
  'Science Fiction',
];
const validators = {
  isEmpty: { test: str => !String(str).length, error: 'The field is required' },
  notSelected: { test: arr => !arr.length, error: 'Select at least one genre to proceed' },
  isNumber: { test: str => isNaN(Number(str)), error: 'The value must be a digit' },
  upTo(limit) {
    return { test: str => +str > limit, error: `The value should not exceed ${limit}` };
  },
};

class EditorForm extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      poster_path: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.string),
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      runtime: PropTypes.number,
      overview: PropTypes.string,
    }),
  };
  static defaultProps = {
    movie: {
      id: Math.floor(Math.random() * 1e7),
      title: '',
      poster_path: '',
      genres: [],
      release_date: '',
      vote_average: '',
      runtime: '',
      overview: '',
    },
  };
  constructor(props) {
    super(props);

    this.movie = { ...props.movie };
    const id = this.movie.id;
    const { isEmpty, isNumber, upTo, notSelected } = validators;

    const form = {
      title: {
        id,
        name: 'title',
        label: 'TITLE',
        placeholder: 'Title',
        value: this.movie.title,
        validators: [isEmpty],
        warnMessage: '',
        touched: false,
      },
      poster_path: {
        id,
        name: 'poster_path',
        label: 'MOVIE URL',
        placeholder: 'https://',
        value: this.movie.poster_path,
        validators: [isEmpty],
        warnMessage: '',
        touched: false,
      },
      genres: {
        id,
        name: 'genres',
        label: 'GENRE',
        placeholder: 'Select Genre',
        value: this.movie.genres,
        validators: [notSelected],
        warnMessage: '',
        touched: false,
      },
      release_date: {
        id,
        name: 'release_date',
        label: 'RELEASE DATE',
        placeholder: 'Select Date',
        value: this.movie.release_date,
        validators: [isEmpty],
        warnMessage: '',
        touched: false,
      },
      vote_average: {
        id,
        name: 'vote_average',
        label: 'RATING',
        placeholder: '7.8',
        value: this.movie.vote_average,
        validators: [isEmpty, isNumber, upTo(10)],
        warnMessage: '',
        touched: false,
      },
      runtime: {
        id,
        name: 'runtime',
        label: 'RUNTIME',
        placeholder: 'minutes',
        value: this.movie.runtime,
        validators: [isEmpty, isNumber],
        warnMessage: '',
        touched: false,
      },
      overview: {
        id,
        name: 'overview',
        label: 'OVERVIEW',
        placeholder: 'Movie description',
        value: this.movie.overview,
        validators: [isEmpty],
        warnMessage: '',
        touched: false,
      },
    };

    this.state = { ...form, disabled: false };

    this.handleEvent = this.handleEvent.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  componentDidMount() {
    if (this.checkFields()) this.setState({ disabled: true });
  }
  componentDidUpdate(_, { disabled, ...fields }) {
    const isError = !!Object.values(fields).find(field => field.warnMessage);
    if (isError !== disabled) this.setState({ disabled: isError });
  }
  handleEvent(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.handleInput(value, name);
  }
  handleInput(value, name) {
    this.setState(oldState => {
      const field = oldState[name];
      const warnMessage = this.validateValue(value, field.validators);

      return { [name]: { ...field, warnMessage, value } };
    });

    this.movie[name] = value;
  }
  handleBlur(e, name = e.target.name) {
    this.setState(oldState => {
      const field = { ...oldState[name] };
      field.touched = true;

      return { [name]: field };
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const { disabled, ...fields } = this.state;

    if (this.checkFields()) {
      Object.keys(fields).forEach(key =>
        this.setState({ [key]: { ...fields[key], touched: true } })
      );
      return;
    }

    this.props.onSubmit(this.movie);
    this.props.handleClose();
  }
  handleReset() {
    const { disabled, ...fields } = this.state;

    Object.keys(fields).forEach(key => {
      const value = typeof fields[key].value === 'string' ? '' : [];
      this.setState({ [key]: { ...fields[key], value }, disabled: true });
      this.movie[key] = value;
    });

    this.setState({ disabled: true });
  }
  checkFields() {
    const { disabled, ...fields } = this.state;
    let isErrors = false;

    Object.values(fields).forEach(field => {
      field.warnMessage = this.validateValue(field.value, field.validators);
      if (field.warnMessage) isErrors = true;
    });

    return isErrors;
  }
  validateValue(value, validators) {
    let warnMessage = '';

    validators.forEach(({ test, error }) => {
      if (test(value)) warnMessage = error;
    });

    return warnMessage;
  }
  render() {
    const { title, poster_path, genres, release_date, vote_average, runtime, overview } =
      this.state;

    return (
      <form
        action="#"
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
        className={styles.form}
      >
        <fieldset name="movie editor">
          <legend>{this.props.formName}</legend>

          <div className={styles.form__top}>
            <div className={styles.form__left}>
              <InputField onInput={this.handleEvent} onBlur={this.handleBlur} {...title} />
              <InputField onInput={this.handleEvent} onBlur={this.handleBlur} {...poster_path} />
              <CheckListField
                options={GENRES}
                onInput={this.handleInput}
                onBlur={this.handleBlur}
                {...genres}
              />
            </div>

            <div className={styles.form__right}>
              <DatePickerField
                onInput={this.handleEvent}
                onBlur={this.handleBlur}
                {...release_date}
              />
              <InputField onInput={this.handleEvent} onBlur={this.handleBlur} {...vote_average} />
              <InputField onInput={this.handleEvent} onBlur={this.handleBlur} {...runtime} />
            </div>
          </div>

          <TextAreaField onInput={this.handleEvent} onBlur={this.handleBlur} {...overview} />
        </fieldset>

        <div className={styles.form__buttons}>
          <input type="reset" value="RESET" className={styles.form__resetBtn} />
          <input
            tabIndex={1}
            type="submit"
            value="SUBMIT"
            className={`${styles.form__submitBtn} ${
              this.state.disabled ? styles.form__submitBtn_disabled : ''
            }`.trimEnd()}
          />
        </div>
      </form>
    );
  }
}

export default EditorForm;

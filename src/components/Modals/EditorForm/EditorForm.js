import React, { Component } from 'react';
import styles from './EditorForm.module.scss';
import { MovieShape } from 'Types';
import { string, bool } from 'prop-types';

import Checklist from './formControls/Checklist';

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

const isEmpty = { test: str => !String(str).length, error: 'The field is required' };
const notSelected = {
  test: obj => !Object.values(obj).filter(_ => _).length,
  error: 'Select at least one genre to proceed',
};
const isNumber = { test: str => isNaN(Number(str)), error: 'The value must be a digit' };
const upTo = limit => ({
  test: str => +str > limit,
  error: `The value should not exceed ${limit}`,
});
const greaterThan = limit => ({
  test: str => +str <= limit,
  error: `The value should be greater than ${limit}`,
});

const arrayToList = (list = []) => {
  const genres = {};
  GENRES.forEach(genre => (genres[genre] = list.includes(genre)));
  return genres;
};
const listToArray = genres => {
  const values = [];
  for (const genre in genres) {
    if (genres[genre]) values.push(genre);
  }
  return values;
};

const scheme = {
  title: {
    toDefaultType: String,
    coercion: String,
    validators: [isEmpty],
  },
  poster_path: {
    toDefaultType: String,
    coercion: String,
    validators: [isEmpty],
  },
  genres: {
    toDefaultType: listToArray,
    coercion: arrayToList,
    validators: [notSelected],
  },
  release_date: {
    toDefaultType: String,
    coercion: String,
    validators: [isEmpty],
  },
  vote_average: {
    toDefaultType: Number,
    coercion: num => (num ? String(num) : ''),
    validators: [isNumber, upTo(10), greaterThan(0), isEmpty],
  },
  runtime: {
    toDefaultType: Number,
    coercion: num => (num ? String(num) : ''),
    validators: [isNumber, greaterThan(0), isEmpty],
  },
  overview: {
    toDefaultType: String,
    coercion: String,
    validators: [isEmpty],
  },
};

const FormField = ({ label, children, touched, error }) => (
  <div className={styles.field}>
    <label className={styles.field__label}>{label}</label>
    {children}
    {touched && error && <span className={styles.field__warn}>{error}</span>}
  </div>
);

FormField.propTypes = {
  label: string,
  touched: bool,
  error: string,
};

class EditorForm extends Component {
  static propTypes = {
    movie: MovieShape,
  };
  static defaultProps = {
    movie: {
      id: Math.floor(Math.random() * 1e7),
      title: '',
      poster_path: '',
      genres: [],
      release_date: '',
      vote_average: 0,
      runtime: 0,
      overview: '',
    },
  };
  constructor(props) {
    super(props);

    this.validators = {};
    const fields = {};
    let errorCount = 0;

    for (const key in scheme) {
      const field = scheme[key];

      this.validators[key] = field.validators;

      const value = field.coercion(props.movie[key]);
      const error = this.validate(key, value);
      const touched = false;

      fields[key] = { value, error, touched };

      if (error) errorCount++;
    }

    this.state = { ...fields, errorCount };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCloseList = this.handleCloseList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    const fieldName = event.target.name;

    this.setFieldState(fieldName, value);
  }
  handleSelect(event) {
    const genre = event.target.value;
    const checked = event.target.checked;

    this.setState(oldState => {
      const field = oldState.genres;
      const value = { ...field.value, [genre]: checked };
      return { genres: { ...field, value } };
    });
  }
  handleCloseList() {
    this.setFieldState('genres', this.state.genres.value);
  }
  handleReset() {
    let errorCount = 0;

    for (const fieldName in scheme) {
      const value = scheme[fieldName].coercion();
      const error = this.validate(fieldName, value);
      if (error) errorCount++;
      this.setState({
        [fieldName]: {
          value,
          error,
          touched: false,
        },
      });
    }

    this.setState({ errorCount });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.errorCount) {
      for (const field in scheme) {
        this.setState(oldState => {
          return { [field]: { ...oldState[field], touched: true } };
        });
      }
      return;
    }

    const movie = Object.assign({}, this.props.movie, this.fields);

    this.props.onSubmit(movie);
    this.props.onClose();
  }
  setFieldState(fieldName, value) {
    const error = this.validate(fieldName, value);

    this.setState(oldState => {
      let errorCount = oldState.errorCount;

      // check if there is already an error - increase the error counter, otherwise decrease it
      if (!oldState[fieldName].error && error) errorCount++;
      else if (oldState[fieldName].error && !error) errorCount--;

      return { [fieldName]: { value, error, touched: true }, errorCount };
    });
  }
  validate(fieldName, value) {
    let errorMessage = '';

    this.validators[fieldName].forEach(({ test, error }) => {
      if (test(value)) errorMessage = error;
    });

    return errorMessage;
  }
  get fields() {
    const fields = {};
    for (const key in scheme) {
      fields[key] = scheme[key].toDefaultType(this.state[key].value);
    }
    return fields;
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
        <fieldset name="movie editor" className={styles.form__fieldset}>
          <legend className={styles.form__legend}>{this.props.formName}</legend>

          <div className={styles.form__top}>
            <div className={styles.form__left}>
              <FormField label="TITLE" error={title.error} touched={title.touched}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title.value}
                  className={styles.field__textInput}
                  onChange={this.handleChange}
                />
              </FormField>
              <FormField label="MOVIE URL" error={poster_path.error} touched={poster_path.touched}>
                <input
                  type="text"
                  name="poster_path"
                  placeholder="https://"
                  value={poster_path.value}
                  className={styles.field__textInput}
                  onChange={this.handleChange}
                />
              </FormField>
              <FormField label="GENRE" error={genres.error} touched={genres.touched}>
                <Checklist
                  name="genre"
                  placeholder="Select Genre"
                  values={genres.value}
                  options={GENRES}
                  onChange={this.handleSelect}
                  onClose={this.handleCloseList}
                />
              </FormField>
            </div>

            <div className={styles.form__right}>
              <FormField
                label="RELEASE DATE"
                error={release_date.error}
                touched={release_date.touched}
              >
                <input
                  type="date"
                  name="release_date"
                  value={release_date.value}
                  className={styles.field__datePicker}
                  onChange={this.handleChange}
                />
              </FormField>
              <FormField label="RATING" error={vote_average.error} touched={vote_average.touched}>
                <input
                  type="text"
                  name="vote_average"
                  placeholder="7.8"
                  value={vote_average.value}
                  className={styles.field__textInput}
                  onChange={this.handleChange}
                />
              </FormField>
              <FormField label="RUNTIME" error={runtime.error} touched={runtime.touched}>
                <input
                  type="text"
                  name="runtime"
                  placeholder="minutes"
                  value={runtime.value}
                  className={styles.field__textInput}
                  onChange={this.handleChange}
                />
              </FormField>
            </div>
          </div>
          <FormField label="OVERVIEW" error={overview.error} touched={overview.touched}>
            <textarea
              type="text"
              cols="30"
              rows="10"
              name="overview"
              placeholder="Movie description"
              value={overview.value}
              className={styles.field__textarea}
              onChange={this.handleChange}
            />
          </FormField>
        </fieldset>

        <div className={styles.form__buttons}>
          <input type="reset" value="RESET" className={styles.form__resetBtn} />
          <input
            tabIndex={1}
            type="submit"
            value="SUBMIT"
            className={
              this.state.errorCount ? styles.form__submitBtn_disabled : styles.form__submitBtn
            }
          />
        </div>
      </form>
    );
  }
}

export default EditorForm;

import React, { PureComponent } from 'react';
import styles from './EditorForm.module.scss';
import { func, string } from 'prop-types';
import { MovieShape } from '@src/types';
import {
  isEmpty,
  notSelected,
  isNumber,
  lessThan,
  greaterThan,
} from '@src/utils/helpers/validators';
import { arrayToObject, objectToArray } from '@src/utils/helpers/helpers';
import { GENRES } from '@src/utils/constants';
import API from '@src/api/api';

import Dialog from '../Dialog/Dialog';
import Checklist from './formControls/Checklist';
import FormField from './formControls/FormField';
import Spinner from '../../Spinner/Spinner';

const SCHEME = {
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
    toDefaultType: objectToArray,
    coercion: arrayToObject,
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
    validators: [isNumber, lessThan(10), greaterThan(0), isEmpty],
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

class EditorForm extends PureComponent {
  static propTypes = {
    ...MovieShape,
    onSubmit: func.isRequired,
    onClose: func.isRequired,
    formName: string.isRequired,
    fetchApi: func.isRequired,
  };
  static defaultProps = {
    id: NaN,
    title: '',
    poster_path: '',
    genres: [],
    release_date: '',
    vote_average: NaN,
    runtime: NaN,
    overview: '',
  };
  constructor(props) {
    super(props);

    this.validators = {};
    const fields = {};
    let errorCount = 0;

    for (const key in SCHEME) {
      const field = SCHEME[key];

      this.validators[key] = field.validators;

      const value = field.coercion(props[key]);
      const error = this.validate(key, value);
      const touched = false;

      fields[key] = { value, error, touched };

      if (error) errorCount++;
    }

    this.state = { ...fields, errorCount, isFetching: false, hasError: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCloseList = this.handleCloseList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidUpdate(_, { hasError }) {
    if (hasError) this.setState({ hasError: false });
  }
  handleChange({ target: { value, name } }) {
    this.setFieldState(name, value);
  }
  handleSelect({ target: { value: genre, checked } }) {
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
    const defaultFields = {};

    for (const fieldName in SCHEME) {
      const value = SCHEME[fieldName].coercion();
      const error = this.validate(fieldName, value);

      if (error) errorCount++;

      defaultFields[fieldName] = {
        value,
        error,
        touched: false,
      };
    }

    this.setState({ ...defaultFields, errorCount });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.errorCount) {
      const touchedFields = {};

      this.setState(oldState => {
        for (const field in SCHEME) {
          touchedFields[field] = { ...oldState[field], touched: true };
        }

        return { ...touchedFields };
      });

      return;
    }

    const { fetchApi, onSubmit, onClose, formName, ...movie } = this.props;
    const updatedMovie = { ...movie, ...this.fields };

    this.setState({ isFetching: true }, () => {
      fetchApi(updatedMovie)
        .then(response => {
          if (isNaN(updatedMovie.id)) onSubmit({ ...updatedMovie, id: response.id });
          else onSubmit(updatedMovie);

          onClose();
        })
        .catch(error => {
          console.error(error);
          this.setState({ isFetching: false, hasError: true });
        });
    });
  }
  handleClose() {
    if (this.state.isFetching) API.tryToCancel().catch(console.error);
    else this.props.onClose();
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
    for (const key in SCHEME) {
      fields[key] = SCHEME[key].toDefaultType(this.state[key].value);
    }
    return fields;
  }
  render() {
    const {
      title,
      poster_path,
      genres,
      release_date,
      vote_average,
      runtime,
      overview,
      isFetching,
      hasError,
      errorCount,
    } = this.state;

    return (
      <Dialog onClose={this.handleClose}>
        <form
          action="#"
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          className={isFetching ? styles.form_blur : styles.form}
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
                <FormField
                  label="MOVIE URL"
                  error={poster_path.error}
                  touched={poster_path.touched}
                >
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
            {hasError && (
              <span className={styles.form__error}>
                Oops! An error occurred. The changes was not saved.
              </span>
            )}
            <button type="reset" className={styles.form__resetBtn}>
              RESET
            </button>
            <button
              tabIndex={1}
              type="submit"
              className={errorCount ? styles.form__submitBtn_disabled : styles.form__submitBtn}
            >
              SUBMIT
            </button>
          </div>
        </form>
        {isFetching && <Spinner fullscreen />}
      </Dialog>
    );
  }
}

export default EditorForm;

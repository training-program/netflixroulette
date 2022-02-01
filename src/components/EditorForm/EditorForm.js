import React, { PureComponent } from 'react';
import {
  func, string, number, arrayOf,
} from 'prop-types';
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
import styles from './EditorForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Checklist from './FormControls/Checklist';
import FormField from './FormControls/FormField';
import Spinner from '../Spinner/Spinner';

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
    coercion: (num) => (num ? String(num) : ''),
    validators: [isNumber, lessThan(10), greaterThan(0), isEmpty],
  },
  runtime: {
    toDefaultType: Number,
    coercion: (num) => (num ? String(num) : ''),
    validators: [isNumber, greaterThan(0), isEmpty],
  },
  overview: {
    toDefaultType: String,
    coercion: String,
    validators: [isEmpty],
  },
};

class EditorForm extends PureComponent {
  constructor(props) {
    super(props);

    this.validators = {};
    const fields = {};
    let errorCount = 0;

    this.fieldNames = Object.keys(SCHEME);

    this.fieldNames.forEach((fieldName) => {
      const field = SCHEME[fieldName];

      this.validators[fieldName] = field.validators;

      const value = field.coercion(props[fieldName]);
      const error = this.validate(fieldName, value);
      const touched = false;

      if (error) {
        errorCount += 1;
      }

      fields[fieldName] = { value, error, touched };
    });

    this.state = {
      ...fields,
      errorCount,
      isFetching: false,
      hasError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCloseList = this.handleCloseList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setFieldState(name, value);
  }

  handleSelect({ target: { value: genre, checked } }) {
    this.setState((oldState) => {
      const field = oldState.genres;
      const value = { ...field.value, [genre]: checked };

      return { genres: { ...field, value } };
    });
  }

  handleCloseList() {
    const {
      genres: { value },
    } = this.state;

    this.setFieldState('genres', value);
  }

  handleReset() {
    let errorCount = 0;
    const defaultFields = {};

    this.fieldNames.forEach((fieldName) => {
      const value = SCHEME[fieldName].coercion();
      const error = this.validate(fieldName, value);

      if (error) {
        errorCount += 1;
      }

      defaultFields[fieldName] = {
        value,
        error,
        touched: false,
      };
    });

    this.setState({ ...defaultFields, errorCount, hasError: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { errorCount } = this.state;

    if (errorCount) {
      const touchedFields = {};

      this.setState((oldState) => {
        this.fieldNames.forEach((fieldName) => {
          touchedFields[fieldName] = { ...oldState[fieldName], touched: true };
        });

        return { ...touchedFields };
      });

      return;
    }

    const {
      fetchApi, onSubmit, onClose, formName, ...movie
    } = this.props;
    const updatedMovie = { ...movie, ...this.fields };

    this.setState({ isFetching: true, hasError: false }, () => {
      fetchApi(updatedMovie)
        .then((response) => {
          if (updatedMovie.id) {
            onSubmit(updatedMovie);
          } else {
            onSubmit({ ...updatedMovie, id: response.id });
          }

          onClose();
        })
        .catch((error) => {
          console.error(error); // eslint-disable-line
          this.setState({ isFetching: false, hasError: true });
        });
    });
  }

  handleClose() {
    const { isFetching } = this.state;
    const { onClose } = this.props;

    if (isFetching) {
      API.tryToCancel().catch(
        console.error, // eslint-disable-line
      );
    } else {
      onClose();
    }
  }

  setFieldState(fieldName, value) {
    const error = this.validate(fieldName, value);

    this.setState((oldState) => {
      let { errorCount } = oldState;

      // check if there is already an error - increase the error counter, otherwise decrease it
      if (!oldState[fieldName].error && error) {
        errorCount += 1;
      } else if (oldState[fieldName].error && !error) {
        errorCount -= 1;
      }

      return { [fieldName]: { value, error, touched: true }, errorCount };
    });
  }

  get fields() {
    const fields = {};

    this.fieldNames.forEach((fieldName) => {
      const {
        [fieldName]: { value },
      } = this.state;

      fields[fieldName] = SCHEME[fieldName].toDefaultType(value);
    });

    return fields;
  }

  validate(fieldName, value) {
    let errorMessage = '';

    this.validators[fieldName].forEach(({ test, error }) => {
      if (test(value)) {
        errorMessage = error;
      }
    });

    return errorMessage;
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
    const { formName } = this.props;

    return (
      <Dialog onClose={this.handleClose}>
        <form
          action="#"
          onSubmit={this.handleSubmit}
          className={isFetching ? styles.form_blur : styles.form}
        >
          <fieldset name="movie editor" className={styles.form__fieldset}>
            <legend className={styles.form__legend}>{formName}</legend>

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
            <button type="button" className={styles.form__resetBtn} onClick={this.handleReset}>
              RESET
            </button>
            <button
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

EditorForm.propTypes = {
  id: number,
  title: string,
  release_date: string,
  poster_path: string,
  vote_average: number,
  overview: string,
  genres: arrayOf(string),
  runtime: number,
  onSubmit: func.isRequired,
  onClose: func.isRequired,
  formName: string.isRequired,
  fetchApi: func.isRequired,
};

EditorForm.defaultProps = {
  id: null,
  title: '',
  poster_path: '',
  genres: [],
  release_date: '',
  vote_average: null,
  runtime: null,
  overview: '',
};

export default EditorForm;

import React, { useState, useReducer, useCallback } from 'react';
import {
  isEmpty, notSelected, isNumber, lessThan, greaterThan,
} from '@src/utils/validators';
import { arrayToObject, objectToArray } from '@src/utils/helpers';
import API from '@src/api/api';
import { GenresChecklist, Movie } from '@src/types';
import styles from './EditorForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Checklist from './FormControls/Checklist';
import FormField from './FormControls/FormField';
import Spinner from '../Spinner/Spinner';

type Props = {
  movie?: Movie;
  formName: string;
  onSubmit: (data: Movie) => void;
  onClose: () => void;
  fetchApi: (data: Movie) => Promise<any>;
};

type Fields =
  | 'title'
  | 'poster_path'
  | 'genres'
  | 'release_date'
  | 'vote_average'
  | 'runtime'
  | 'overview';

type FieldValue<T> = T extends 'genres' ? GenresChecklist : string;

type Field<T> = {
  value: FieldValue<T>;
  error: string;
  touched: boolean;
};

type FieldData = {
  [key in Fields]: Field<key>;
};

interface FormData extends FieldData {
  errorCount: number;
}

type TextEvents = React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>;

const DEFAULT_MOVIE: Movie = {
  id: 0,
  title: '',
  tagline: '',
  vote_average: 0,
  vote_count: 0,
  release_date: '',
  poster_path: '',
  overview: '',
  budget: 0,
  revenue: 0,
  genres: [],
  runtime: 0,
};

const VALIDATORS_SCHEME = {
  title: [isEmpty],
  poster_path: [isEmpty],
  genres: [notSelected],
  release_date: [isEmpty],
  vote_average: [isNumber, lessThan(10), greaterThan(0), isEmpty],
  runtime: [isNumber, greaterThan(0), isEmpty],
  overview: [isEmpty],
};

const FIELDS = Object.keys(VALIDATORS_SCHEME) as Fields[];

const validate = (fieldName: Fields, value: string | GenresChecklist) => {
  let errorMessage = '';

  VALIDATORS_SCHEME[fieldName].forEach(({ test, error }) => {
    if (test(value)) {
      errorMessage = error;
    }
  });

  return errorMessage;
};

const initFields = (movie: Movie): FormData => {
  let errorCount = 0;

  const {
    title, vote_average, release_date, poster_path, overview, genres, runtime,
  } = movie;

  const fields = {
    title,
    release_date,
    poster_path,
    overview,
    genres: arrayToObject(genres),
    vote_average: String(vote_average || ''),
    runtime: String(runtime || ''),
  };

  const fieldData = {} as FieldData;

  FIELDS.forEach((fieldName) => {
    const value = fields[fieldName];
    const error = validate(fieldName, value);
    const touched = false;

    if (error) {
      errorCount += 1;
    }

    const field: Field<typeof fieldName> = { value, touched, error };
    fieldData[fieldName] = field;
  });

  return { ...fieldData, errorCount };
};

enum ActionType {
  Reset,
  TouchAll,
  Input,
}

type Payload<T> = { name: T; value: FieldValue<T> };

type ResetAction = { type: ActionType.Reset };
type TouchAllAction = { type: ActionType.TouchAll };
type UpdateAction<T> = { type: ActionType.Input; payload: Payload<T> };

type Action<T> = ResetAction | TouchAllAction | UpdateAction<T>;

const fieldsReducer = <T extends Fields>(state: FormData, action: Action<T>): FormData => {
  switch (action.type) {
    case ActionType.Reset: {
      return initFields(DEFAULT_MOVIE);
    }

    case ActionType.TouchAll: {
      const touchedFields = {} as FieldData;

      FIELDS.forEach((fieldName) => {
        const field: Field<typeof fieldName> = { ...state[fieldName], touched: true };
        touchedFields[fieldName] = field;
      });

      return { ...state, ...touchedFields };
    }

    case ActionType.Input: {
      const {
        payload: { name, value },
      } = action;

      let { errorCount } = state;
      const error = validate(name, value);
      const {
        [name]: { error: oldError },
      } = state;

      if (!oldError && error) {
        errorCount += 1;
      } else if (oldError && !error) {
        errorCount -= 1;
      }

      const field: Field<typeof name> = { error, value, touched: true };

      return { ...state, [name]: field, errorCount };
    }
    default: {
      return state;
    }
  }
};

const EditorForm = ({
  onSubmit, onClose, fetchApi, formName, movie = DEFAULT_MOVIE,
}: Props) => {
  const [formData, dispatchFields] = useReducer(fieldsReducer, movie, initFields);
  const [isFetching, setFetching] = useState(false);
  const [hasLoadError, setLoadError] = useState(false);

  const handleChange = (name: Fields) => ({ currentTarget: { value } }: TextEvents) => {
    dispatchFields({ type: ActionType.Input, payload: { name, value } });
  };

  const handleCloseChecklist = (value: GenresChecklist) => {
    dispatchFields({ type: ActionType.Input, payload: { name: 'genres', value } });
  };

  const handleReset = () => {
    dispatchFields({ type: ActionType.Reset });
    setLoadError(false);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (formData.errorCount) {
      dispatchFields({ type: ActionType.TouchAll });
      return;
    }

    const {
      title, vote_average, release_date, poster_path, overview, genres, runtime,
    } = formData;

    const draftMovie: Partial<Movie> = {
      title: title.value,
      release_date: release_date.value,
      poster_path: poster_path.value,
      overview: overview.value,
      genres: objectToArray(genres.value),
      vote_average: Number(Number(vote_average.value).toFixed(1)),
      runtime: Number(runtime.value),
    };

    const updatedMovie: Movie = { ...movie, ...draftMovie };

    setFetching(true);
    setLoadError(false);

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
        setFetching(false);
        setLoadError(true);
      });
  };

  const handleClose = useCallback(() => {
    if (isFetching) {
      API.tryToCancel().catch(
        console.error, // eslint-disable-line
      );
    } else {
      onClose();
    }
  }, [isFetching, onClose]);

  const {
    title, poster_path, genres, release_date, vote_average, runtime, overview, errorCount,
  } = formData;

  return (
    <Dialog onClose={handleClose}>
      <form
        action="#"
        onSubmit={handleSubmit}
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
                  onChange={handleChange('title')}
                />
              </FormField>
              <FormField label="MOVIE URL" error={poster_path.error} touched={poster_path.touched}>
                <input
                  type="text"
                  name="poster_path"
                  placeholder="https://"
                  value={poster_path.value}
                  className={styles.field__textInput}
                  onChange={handleChange('poster_path')}
                />
              </FormField>
              <FormField label="GENRE" error={genres.error} touched={genres.touched}>
                <Checklist
                  name="genre"
                  placeholder="Select Genre"
                  values={genres.value}
                  onChange={handleCloseChecklist}
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
                  onChange={handleChange('release_date')}
                />
              </FormField>
              <FormField label="RATING" error={vote_average.error} touched={vote_average.touched}>
                <input
                  type="text"
                  name="vote_average"
                  placeholder="7.8"
                  value={vote_average.value}
                  className={styles.field__textInput}
                  onChange={handleChange('vote_average')}
                />
              </FormField>
              <FormField label="RUNTIME" error={runtime.error} touched={runtime.touched}>
                <input
                  type="text"
                  name="runtime"
                  placeholder="minutes"
                  value={runtime.value}
                  className={styles.field__textInput}
                  onChange={handleChange('runtime')}
                />
              </FormField>
            </div>
          </div>
          <FormField label="OVERVIEW" error={overview.error} touched={overview.touched}>
            <textarea
              cols={30}
              rows={10}
              name="overview"
              placeholder="Movie description"
              value={overview.value}
              className={styles.field__textarea}
              onChange={handleChange('overview')}
            />
          </FormField>
        </fieldset>

        <div className={styles.form__buttons}>
          {hasLoadError && (
            <span className={styles.form__error}>
              Oops! An error occurred. The changes was not saved.
            </span>
          )}
          <button type="button" className={styles.form__resetBtn} onClick={handleReset}>
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
};

export default EditorForm;

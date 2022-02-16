import React, {
  useState, useReducer, useCallback, SyntheticEvent,
} from 'react';
import API from '@src/api/api';
import { DEFAULT_MOVIE } from '@src/utils/constants';
import { objectToArray } from '@src/utils/helpers';
import { GenresChecklist, Movie } from '@src/types';
import {
  EditorFormProps, FieldNames, TextEvents, ActionType,
} from './EditorForm.types';
import { fieldsReducer, initFields } from './EditorForm.reducers';
import styles from './EditorForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Checklist from './FormControls/Checklist';
import FormField from './FormControls/FormField';
import Spinner from '../Spinner/Spinner';

const EditorForm = ({
  onSubmit,
  onClose,
  fetchApi,
  formName,
  movie = DEFAULT_MOVIE,
}: EditorFormProps) => {
  const [formState, dispatchFields] = useReducer(fieldsReducer, movie, initFields);
  const [isFetching, setFetching] = useState(false);
  const [hasError, setError] = useState(false);

  const handleChange = (name: FieldNames) => ({ currentTarget: { value } }: TextEvents) => {
    dispatchFields({ type: ActionType.Input, payload: { name, value } });
  };

  const handleChangeChecklist = useCallback((value: GenresChecklist) => {
    dispatchFields({
      type: ActionType.Input,
      payload: { name: 'genres', value },
    });
  }, []);

  const handleReset = () => {
    dispatchFields({ type: ActionType.Reset });
    setError(false);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (formState.errorCount) {
      dispatchFields({ type: ActionType.TouchAll });
      return;
    }

    const {
      title, vote_average, release_date, poster_path, overview, genres, runtime,
    } = formState;

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
    setError(false);

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
        setError(true);
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
  } = formState;

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
                  onChange={handleChangeChecklist}
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
          {hasError && (
            <span className={styles.form__error}>
              Oops! An error occurred. The changes cannot be saved.
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

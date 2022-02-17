import React, { useReducer, useCallback, SyntheticEvent } from 'react';
import API from '@src/api/api';
import { DEFAULT_MOVIE } from '@src/utils/constants';
import { objectToArray } from '@src/utils/helpers';
import { GenreRecord, Movie } from '@src/types';
import {
  EditorFormProps, FieldNames, TextEvents, ActionType,
} from './EditorForm.types';
import fieldsReducer from './EditorForm.reducers';
import getInitialFields from './EditorForm.helpers';
import styles from './EditorForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Checklist from './Checklist/Checklist';
import FormField from './FormField/FormField';
import Spinner from '../Spinner/Spinner';

const EditorForm = ({
  onSubmit,
  onClose,
  fetchApi,
  formName,
  movie = DEFAULT_MOVIE,
}: EditorFormProps) => {
  const [
    {
      title,
      poster_path,
      genres,
      release_date,
      vote_average,
      runtime,
      overview,
      errorCount,
      isFetching,
      hasError,
    },
    dispatch,
  ] = useReducer(fieldsReducer, movie, getInitialFields);

  const handleChange = (name: FieldNames) => ({ currentTarget: { value } }: TextEvents) => {
    dispatch({ type: ActionType.Input, payload: { name, value } });
  };

  const handleChangeChecklist = useCallback((value: GenreRecord) => {
    dispatch({
      type: ActionType.Input,
      payload: { name: 'genres', value },
    });
  }, []);

  const handleReset = () => dispatch({ type: ActionType.Reset });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (errorCount) {
      dispatch({ type: ActionType.TouchAll });
      return;
    }

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

    dispatch({ type: ActionType.SetFetching });

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
        dispatch({ type: ActionType.SetError });
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

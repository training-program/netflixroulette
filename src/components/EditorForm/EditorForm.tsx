import React, { useReducer, useCallback, useContext, SyntheticEvent } from 'react';
import useAbortRequest from '@src/hooks/useAbortRequest';
import useSendRequest from '@src/hooks/useSendRequest';
import { AppContext } from '@src/context/app.context';
import { DEFAULT_MOVIE } from '@src/utils/constants';
import { objectToArray } from '@src/utils/helpers';
import { GenreRecord, Movie } from '@src/types';
import { EditorFormProps, FieldNames, TextEvents, ActionType } from './EditorForm.types';
import fieldsReducer from './EditorForm.reducers';
import getInitialFields from './EditorForm.helpers';
import styles from './EditorForm.module.scss';

import Dialog from '../Dialog/Dialog';
import Checklist from './Checklist/Checklist';
import FormField from './FormField/FormField';
import Spinner from '../Spinner/Spinner';
import ModalSuccess from '../ModalSuccess/ModalSuccess';

const EditorForm = ({
  id,
  variant: {
    action,
    successMessage,
    legend,
    apiMethod: { controller, request },
  },
}: EditorFormProps) => {
  const { movies, dispatchMovieContext, setShowAdd, setShowEdit } = useContext(AppContext);
  const movie = movies.find((item) => item.id === id) || DEFAULT_MOVIE;
  const [
    { title, poster_path, genres, release_date, vote_average, runtime, overview, errorCount },
    dispatchForm,
  ] = useReducer(fieldsReducer, movie, getInitialFields);

  const onSuccess = useCallback(
    (response: Movie) => dispatchMovieContext({ type: action, payload: response }),
    [dispatchMovieContext, action],
  );
  const {
    status: { loading, success, error },
    sendRequest,
  } = useSendRequest(request, onSuccess);

  useAbortRequest(loading, controller);

  const handleChange =
    (name: FieldNames) =>
    ({ currentTarget: { value } }: TextEvents) => {
      dispatchForm({ type: ActionType.INPUT, payload: { name, value } });
    };

  const handleChangeChecklist = useCallback((value: GenreRecord) => {
    dispatchForm({
      type: ActionType.INPUT,
      payload: { name: 'genres', value },
    });
  }, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (errorCount) {
      dispatchForm({ type: ActionType.TOUCH_ALL });
      return;
    }

    sendRequest({
      ...movie,
      title: title.value,
      release_date: release_date.value,
      poster_path: poster_path.value,
      overview: overview.value,
      genres: objectToArray(genres.value),
      vote_average: Number(Number(vote_average.value).toFixed(1)),
      runtime: Number(runtime.value),
    });
  };

  const handleClose = useCallback(() => {
    setShowAdd(false);
    setShowEdit(false);
  }, [setShowAdd, setShowEdit]);

  return success ? (
    <ModalSuccess message={successMessage} onClose={handleClose} />
  ) : (
    <Dialog onClose={handleClose}>
      <form action="#" onSubmit={handleSubmit} className={loading ? styles.form_blur : styles.form}>
        <fieldset name="movie editor" className={styles.form__fieldset}>
          <legend className={styles.form__legend}>{legend}</legend>

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
          {error && (
            <span className={styles.form__error}>
              Oops! An error occurred. The changes cannot be saved.
            </span>
          )}
          <button
            type="button"
            className={styles.form__resetBtn}
            onClick={() => dispatchForm({ type: ActionType.RESET })}
          >
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
      {loading && <Spinner fullscreen />}
    </Dialog>
  );
};

export default EditorForm;

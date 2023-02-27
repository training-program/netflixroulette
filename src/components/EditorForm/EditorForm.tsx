import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { BaseMovie, RootState } from '@src/types';
import { useAppDispatch } from '@src/hooks/redux';
import { DEFAULT_MOVIE, STATUSES } from '@src/utils/constants';
import useHandleClose from '@src/hooks/useHandleClose';
import { EditorFormProps } from './EditorForm.types';
import validate from './EditorForm.helpers';

import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';
import ModalSuccess from '../ModalSuccess/ModalSuccess';
import EditorInput from './EditorInput/EditorInput';
import EditorTextarea from './EditorTextarea/EditorTextarea';
import EditorSelect from './EditorSelect/EditorSelect';
import Button from '../common/Button/Button';

const { ERROR, SUCCESS, INITIAL } = STATUSES;

const EditorForm = ({ action, variant: { successMessage, legend } }: EditorFormProps) => {
  const { id } = useParams();
  const initialMovie =
    useSelector(({ movies: { movies } }: RootState) =>
      movies.find((movie) => movie.id === Number(id)),
    ) || DEFAULT_MOVIE;
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (fields: BaseMovie, { setStatus }: FormikHelpers<BaseMovie>) =>
      dispatch(action(fields))
        .then(() => setStatus(SUCCESS))
        .catch(() => setStatus(ERROR)),
    [dispatch, action],
  );

  const handleClose = useHandleClose();

  return (
    <Formik
      initialValues={initialMovie}
      validate={validate}
      onSubmit={handleSubmit}
      initialStatus={INITIAL}
    >
      {({ isValid, isSubmitting, status: { success, error } }) =>
        success ? (
          <ModalSuccess message={successMessage} onClose={handleClose} />
        ) : (
          <Dialog onClose={handleClose}>
            <Form
              className={`${
                isSubmitting && 'blur-sm'
              } relative w-[90vw] max-w-4xl pt-3 p-14 flex flex-col`}
            >
              <fieldset name="movie editor" className="p-0 pt-6 pb-14 mt-10">
                <legend className="text-4xl font-extralight">{legend}</legend>
                <div className="flex gap-7">
                  <div className="basis-4/5">
                    <EditorInput type="text" name="title" label="TITLE" placeholder="Title" />
                    <EditorInput
                      type="text"
                      name="poster_path"
                      label="MOVIE URL"
                      placeholder="https://"
                    />
                    <EditorSelect label="GENRE" placeholder="Select Genre" name="genres" />
                  </div>

                  <div>
                    <EditorInput type="date" name="release_date" label="RELEASE DATE" />
                    <EditorInput
                      type="number"
                      name="vote_average"
                      label="RATING"
                      placeholder="7.8"
                    />
                    <EditorInput
                      type="number"
                      name="runtime"
                      label="RUNTIME"
                      placeholder="minutes"
                    />
                  </div>
                </div>
                <EditorTextarea
                  cols={30}
                  rows={10}
                  name="overview"
                  label="OVERVIEW"
                  placeholder="Movie description"
                  className="max-h-48 w-full resize-none"
                />
              </fieldset>
              <div className="flex gap-3 w-full ">
                <span className={`${!error && 'invisible'} text-primary text-left flex-grow`}>
                  Oops! An error occurred. <br />
                  The changes cannot be saved.
                </span>
                <Button type="reset" variant="outlined">
                  RESET
                </Button>
                <Button type="submit" disabled={!isValid}>
                  SUBMIT
                </Button>
              </div>
            </Form>
            {isSubmitting && <Spinner fullscreen />}
          </Dialog>
        )
      }
    </Formik>
  );
};

export default EditorForm;

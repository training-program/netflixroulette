import { BaseMovie } from '@src/types';
import { ERROR_MESSAGES } from '@src/utils/constants';
import { FormikErrors } from 'formik';

const { REQUIRED, MIN_VALUE, MAX_VALUE, NOT_LINK } = ERROR_MESSAGES;

const validate = ({
  title,
  poster_path,
  genres,
  release_date,
  vote_average,
  runtime,
  overview,
}: BaseMovie) => {
  const errors: FormikErrors<BaseMovie> = {};

  if (!title) {
    errors.title = REQUIRED;
  }

  if (!poster_path) {
    errors.poster_path = REQUIRED;
  } else if (!/^https?:\/\/./.test(poster_path)) {
    errors.poster_path = NOT_LINK;
  }

  if (!genres.length) {
    errors.genres = REQUIRED;
  }

  if (!release_date) {
    errors.release_date = REQUIRED;
  }

  if (typeof vote_average !== 'number') {
    errors.vote_average = REQUIRED;
  } else if (vote_average < 0) {
    errors.vote_average = MIN_VALUE;
  } else if (vote_average > 100) {
    errors.vote_average = MAX_VALUE;
  }

  if (typeof runtime !== 'number') {
    errors.runtime = REQUIRED;
  } else if (runtime < 0) {
    errors.runtime = MIN_VALUE;
  }

  if (!overview) {
    errors.overview = REQUIRED;
  }

  return errors;
};

export default validate;

import { Movie } from '@src/types';
import { FIELDS } from '@src/utils/constants';
import { arrayToObject, validate } from '@src/utils/helpers';
import { FormState, FormStateField, FormData } from './EditorForm.types';

const getInitialFields = (movie: Movie): FormState => {
  let errorCount = 0;

  const { title, vote_average, release_date, poster_path, overview, genres, runtime } = movie;

  const fields = {
    title,
    release_date,
    poster_path,
    overview,
    genres: arrayToObject(genres),
    vote_average: String(vote_average || ''),
    runtime: String(runtime || ''),
  };

  const fieldData = {} as FormData;

  FIELDS.forEach((fieldName) => {
    const value = fields[fieldName];
    const error = validate(fieldName, value);
    const touched = false;

    const field: FormStateField<typeof fieldName> = { value, touched, error };
    fieldData[fieldName] = field;

    if (error) {
      errorCount += 1;
    }
  });

  return {
    ...fieldData,
    errorCount,
    isFetching: false,
    hasError: false,
  };
};

export default getInitialFields;

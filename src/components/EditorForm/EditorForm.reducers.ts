import { Movie } from '@src/types';
import { DEFAULT_MOVIE, FIELDS } from '@src/utils/constants';
import { arrayToObject, validate } from '@src/utils/helpers';
import {
  FieldNames,
  FormData,
  FormState,
  FormStateField,
  Action,
  ActionType,
} from './EditorForm.types';

export const initFields = (movie: Movie): FormState => {
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

  return { ...fieldData, errorCount };
};

export const fieldsReducer = <T extends FieldNames>(
  state: FormState,
  action: Action<T>,
): FormState => {
  switch (action.type) {
    case ActionType.Reset: {
      return initFields(DEFAULT_MOVIE);
    }

    case ActionType.TouchAll: {
      const touchedFields = {} as FormData;

      FIELDS.forEach((fieldName) => {
        const field: FormStateField<typeof fieldName> = { ...state[fieldName], touched: true };
        touchedFields[fieldName] = field;
      });

      return { ...state, ...touchedFields };
    }

    case ActionType.Input: {
      const {
        payload: { name, value },
      } = action;
      const error = validate(name, value);
      const {
        [name]: { error: oldError },
      } = state;

      let { errorCount } = state;

      if (!oldError && error) {
        errorCount += 1;
      } else if (oldError && !error) {
        errorCount -= 1;
      }

      const field: FormStateField<typeof name> = { error, value, touched: true };

      return { ...state, [name]: field, errorCount };
    }
    default: {
      return state;
    }
  }
};

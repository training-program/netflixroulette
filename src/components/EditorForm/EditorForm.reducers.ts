import { DEFAULT_MOVIE, FIELDS } from '@src/utils/constants';
import { validate } from '@src/utils/helpers';
import getInitialFields from './EditorForm.helpers';
import {
  FieldNames,
  FormData,
  FormState,
  FormStateField,
  Action,
  ActionType,
} from './EditorForm.types';

const fieldsReducer = <T extends FieldNames>(state: FormState, action: Action<T>): FormState => {
  switch (action.type) {
    case ActionType.Reset: {
      return getInitialFields(DEFAULT_MOVIE);
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

export default fieldsReducer;

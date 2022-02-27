import { ContextAction, ContextActionType, Movie } from '@src/types';

const moviesReducer = (state: Movie[], action: ContextAction) => {
  switch (action.type) {
    case ContextActionType.UPDATE: {
      return action.payload;
    }
    case ContextActionType.ADD: {
      return [action.payload, ...state];
    }
    case ContextActionType.EDIT:
    case ContextActionType.DELETE: {
      const { payload } = action;
      const isDelete = typeof payload === 'number';
      const id = isDelete ? payload : payload.id;
      const index = state.findIndex((movie) => movie.id === id);

      if (index === -1) {
        return state;
      }

      const moviesCopy = [...state];

      if (isDelete) {
        moviesCopy.splice(index, 1);
      } else {
        moviesCopy.splice(index, 1, payload);
      }

      return moviesCopy;
    }
    default: {
      return state;
    }
  }
};

export default moviesReducer;

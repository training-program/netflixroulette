import { ContextAction, Movie } from '@src/types';

const MoviesReducer = (state: Movie[], action: ContextAction) => {
  switch (action.type) {
    case 'UPDATE': {
      return action.payload;
    }
    case 'ADD': {
      return [action.payload, ...state];
    }
    case 'EDIT':
    case 'DELETE': {
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

export default MoviesReducer;

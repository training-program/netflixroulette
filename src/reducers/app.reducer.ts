import { ContextAction, ContextActionType } from '@src/types';
import { Context } from '../context/context.types';

const appContextReducer = (state: Context, action: ContextAction) => {
  switch (action.type) {
    case ContextActionType.UPDATE: {
      return { ...state, movies: action.payload };
    }
    case ContextActionType.ADD: {
      return { ...state, movies: [action.payload, ...state.movies] };
    }
    case ContextActionType.EDIT:
    case ContextActionType.DELETE: {
      const moviesCopy = [...state.movies];
      const { payload } = action;
      const isDelete = typeof payload === 'number';
      const id = isDelete ? payload : payload.id;
      const index = moviesCopy.findIndex((movie) => movie.id === id);

      if (index === -1) {
        return state;
      }

      if (isDelete) {
        const { setShowDelete, setShowMovieDetails } = state;

        setShowDelete(false);
        setShowMovieDetails(false);
        moviesCopy.splice(index, 1);
      } else {
        moviesCopy.splice(index, 1, payload);
      }

      return { ...state, movies: moviesCopy };
    }
    default: {
      return state;
    }
  }
};

export default appContextReducer;

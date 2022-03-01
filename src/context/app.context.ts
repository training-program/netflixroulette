import { createContext } from 'react';
import { Context } from './context.types';

const AppContext = createContext<Context>({
  setCurrentId: () => {},
  setShowAdd: () => {},
  setShowEdit: () => {},
  setShowDelete: () => {},
  setShowMovieDetails: () => {},
});

export default AppContext;

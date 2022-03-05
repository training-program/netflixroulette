import { createContext } from 'react';
import { Context } from './context.types';

const AppContext = createContext<Context>({
  setActiveMovieId: () => {},
  setEditingMovieId: () => {},
  setShowAdd: () => {},
  setShowEdit: () => {},
  setShowDelete: () => {},
});

export default AppContext;

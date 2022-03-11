import { noop } from '@src/utils/constants';
import { createContext } from 'react';
import { Context } from './context.types';

const AppContext = createContext<Context>({
  setActiveMovieId: noop,
  setEditingMovieId: noop,
  setShowAdd: noop,
  setShowEdit: noop,
  setShowDelete: noop,
});

export default AppContext;

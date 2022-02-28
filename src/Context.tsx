import React, { useMemo, useReducer, useState } from 'react';
import App from './App';
import 'normalize.css';
import './index.scss';
import { inititalRequestParameters, initialRequestStatus, AppContext } from './context/app.context';
import appContextReducer from './reducers/app.reducer';

const Context = () => {
  const [requestParameters, setRequestParameters] = useState(inititalRequestParameters);
  const [status, setStatus] = useState(initialRequestStatus);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  const [context, dispatchMovieContext] = useReducer(appContextReducer, {
    movies: [],
    dispatchMovieContext: () => {},
    showAdd,
    setShowAdd,
    showEdit,
    setShowEdit,
    showDelete,
    setShowDelete,
    showMovieDetails,
    setShowMovieDetails,
    requestParameters,
    setRequestParameters,
    status,
    setStatus,
  });

  const memorizedContext = useMemo(
    () => ({
      ...context,
      dispatchMovieContext,
      showAdd,
      showEdit,
      showDelete,
      showMovieDetails,
      requestParameters,
      status,
    }),
    [context, showAdd, showEdit, showDelete, showMovieDetails, requestParameters, status],
  );

  return (
    <AppContext.Provider value={memorizedContext}>
      <App />
    </AppContext.Provider>
  );
};

export default Context;

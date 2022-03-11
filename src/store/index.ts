import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from './reducers/movies.reducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

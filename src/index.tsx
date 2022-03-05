import { render } from 'react-dom';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import 'normalize.css';
import './index.scss';

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('netflixroulette-root'),
);

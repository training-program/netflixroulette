import { render } from 'react-dom';
import React, { StrictMode } from 'react';
import App from './App.js';
import 'normalize.css';
import './index.scss';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('netflixroulette-root')
);
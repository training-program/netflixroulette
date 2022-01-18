import { render } from 'react-dom';
import React from 'react';
import App from './App.js';
import 'normalize.css';
import './index.scss';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('netflixroulette-root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import history from './history.js';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

// index.js
import { Router } from 'react-router-dom'

ReactDOM.render((
  <Router history={history}>
    <App />
  </Router>
), document.getElementById('root'))

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

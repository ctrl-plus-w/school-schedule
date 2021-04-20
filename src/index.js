import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import './styles/_global.scss';

import App from './app/App';
import reportWebVitals from './reportWebVitals';

import store from './app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

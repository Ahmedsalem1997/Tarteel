import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import App from './App';
import "bootstrap/dist/js/bootstrap.min.js";
import { Provider } from 'react-redux';
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

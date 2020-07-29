import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config();

console.log(`Backend URL: ${process.env.REACT_APP_SERVER}`);

// Globally configure axios
axios.defaults.baseURL = process.env.REACT_APP_SERVER;
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config();

// Globally configure axios
axios.defaults.baseURL = process.env.REACT_APP_SERVER;
axios.defaults.headers.post['Content-Type'] = 'application/json';

console.log(`Backend Server URL: ${process.env.REACT_APP_SERVER}`);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
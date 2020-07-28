import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

// Globally configure axios
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
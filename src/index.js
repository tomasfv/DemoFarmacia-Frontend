import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import axios from "axios";


//axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'https://demofarmacia-backend-production.up.railway.app/'; 



ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
          <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

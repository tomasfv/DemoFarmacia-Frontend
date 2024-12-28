import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import axios from "axios";
import {Auth0Provider} from '@auth0/auth0-react';

//axios.defaults.baseURL = 'http://localhost:3001';
//axios.defaults.baseURL = 'https://pointsapp-backend-production.up.railway.app/';
axios.defaults.baseURL = 'https://pointsapp-backend-production-2879.up.railway.app/'; //nuevo

const domain = process.env.REACT_APP_AUTH0_DOMAIN; 
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID; 

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
          <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import store from "./services/store";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
      <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
  </BrowserRouter>

);

reportWebVitals();

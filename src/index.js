import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from '@reduxjs/toolkit';
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer:rootReducer,
});
//App component ko Provider me rap karna padega 
//provider me store as a prop pass krna padega using configure store
//reducers ko combine krna padega (multiple reducer to be combine using  combine reducer)
//each reducer is created from multipe slices
//slices to be created including initial state and reducer to manipulate the states(using createSlice)
//

const root = ReactDOM.createRoot(document.getElementById("root"));
document.title="StudyNotion"
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

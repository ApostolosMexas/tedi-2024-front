import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { usePromiseTracker } from "react-promise-tracker";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SpinnerWrapper from "./components/Spinner";

const root = ReactDOM.createRoot(document.getElementById("root"));

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? <SpinnerWrapper isLoading={true} /> : null;
};

root.render(
  <Provider store={store}>
    <LoadingIndicator />
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

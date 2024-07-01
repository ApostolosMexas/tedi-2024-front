import React from "react";
import ReactDOM from "react-dom/client";
import App from './views/App/App';
import './assets/css/index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {

  return (
    <>
      <App />
    </>
  );
};

root.render(
    <Index />
);

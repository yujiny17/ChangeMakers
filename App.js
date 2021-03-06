// /App.js
import React from "react";
import HybridApp from "./src/App";
import { Provider } from "react-redux";
import store from "./src/store/store";

const App = (props) => {
  return (
    <Provider store={store}>
      <HybridApp />
    </Provider>
  );
};
export default App;

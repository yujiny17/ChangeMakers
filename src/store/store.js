import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers/reducers";
import rootSaga from "../sagas/sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;

// const configureStore = () => {
//   const sagaMiddleware = createSagaMiddleware();
//   return {
//     ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
//     runSaga: sagaMiddleware.run(rootSaga),
//   };
// };

// export default configureStore;

// CHANGE APP.JS IF I SWITCH

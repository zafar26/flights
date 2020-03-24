import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  // applyMiddleware(...middleware)
);
if (module.hot) {
  module.hot.accept("./reducers", () => {
    const nextRootreducer = require("./reducers/index").default;
    store.replaceReducer(nextRootreducer);
  });
}

export default store;

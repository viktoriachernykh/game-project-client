import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./rootReducer";
import ReduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const store = createStore(reducer, enhancer);

export default store;

// import { createStore, applyMiddleware, compose } from "redux";
// import reducer from "./rootReducer";
// import ReduxThunk from "redux-thunk";

// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
//   ? window.__REDUX_DEVTOOLS_EXTENSION__()
//   : x => x;

// const enhancer = compose(applyMiddleware(ReduxThunk), devTools);
// const store = createStore(reducer, enhancer);

// export default store;

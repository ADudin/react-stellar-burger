import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

import { 
  compose, 
  createStore,  
  applyMiddleware, 
  combineReducers 
} from "redux";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { ingridientsReducer } from "./services/reducers/ingridients";
import { ingridientReducer } from "./services/reducers/ingridient";
import { burgerConstructorReducer } from "./services/reducers/burger-constructor";
import { orderReducer } from "./services/reducers/order";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk))

const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  currentIngridient: ingridientReducer,
  addedIngridients: burgerConstructorReducer,
  order: orderReducer
});

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

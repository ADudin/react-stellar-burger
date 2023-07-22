import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

// import { 
//   compose, 
//   createStore,  
//   applyMiddleware, 
//   combineReducers 
// } from "redux";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { store } from "./services/store/store";
//import { rootReducer } from "./services/store/store";

// import thunk from "redux-thunk";
// import { ingredientsReducer } from "./services/reducers/ingredients";
// import { ingredientReducer } from "./services/reducers/ingredient";
// import { burgerConstructorReducer } from "./services/reducers/burger-constructor";
// import { orderReducer } from "./services/reducers/order";
// import { userReducer } from "./services/reducers/user";

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));

// const rootReducer = combineReducers({
//   ingredients: ingredientsReducer,
//   currentIngredient: ingredientReducer,
//   addedIngredients: burgerConstructorReducer,
//   order: orderReducer,
//   user: userReducer
// });

// const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

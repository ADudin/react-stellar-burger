import { 
  compose, 
  createStore,  
  applyMiddleware, 
  combineReducers 
} from "redux";

import thunk from "redux-thunk";

import { ingredientsReducer } from "../reducers/ingredients";
import { ingredientReducer } from "../reducers/ingredient";
import { burgerConstructorReducer } from "../reducers/burger-constructor";
import { orderReducer } from "../reducers/order";
import { userReducer } from "../reducers/user";
import { orderFeedReducer } from "../reducers/order-feed";

import { socketMiddleware } from "../middleware/socketMiddleware";

import { 
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_OPEN,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_ERROR
} from "../actions/order-feed";


const orderFeedStatus = {
  wsConnect: ORDER_FEED_CONNECT,
  wsDisconnect: ORDER_FEED_DISCONNECT,
  wsConnecting: ORDER_FEED_WS_CONNECTING,
  onOpen: ORDER_FEED_WS_OPEN,
  onClose: ORDER_FEED_WS_CLOSE,
  onMessage: ORDER_FEED_WS_MESSAGE,
  onError: ORDER_FEED_WS_ERROR
};

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
};

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk), 
  applyMiddleware(socketMiddleware(orderFeedStatus))
);

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  currentIngredient: ingredientReducer,
  addedIngredients: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer,
  orderFeed: orderFeedReducer
});

export const store = createStore(rootReducer, enhancer);
import { WebsocketStatus } from "../../utils/data";

import { 
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_OPEN,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_ERROR,
  TOrderFeedActions
} from "../actions/order-feed";

import { IOrders } from "../types/orders-type";

export interface IOrderFeedState {
  status: string;
  orders: IOrders;
  connectingError: string;
};

const initialState: IOrderFeedState = {
  status: WebsocketStatus.OFFLINE,
  orders: {
    success: true,
    orders: [],
    total: 0,
    totalToday: 0,
},
  connectingError: ''
};

export const orderFeedReducer = (state: IOrderFeedState = initialState, action: TOrderFeedActions) => {
  switch (action.type) {
    case ORDER_FEED_WS_CONNECTING: {
      return { ...state, status: WebsocketStatus.CONNECTING };
    }
    case ORDER_FEED_WS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: ''
      };
    }
    case ORDER_FEED_WS_CLOSE: {
      return {
        ...state,
        orders: initialState.orders,
        status: WebsocketStatus.OFFLINE
      };
    }
    case ORDER_FEED_WS_MESSAGE: {
      //console.log(action.payload);
      return {
        ...state,
        orders: action.payload
      };
    }
    case ORDER_FEED_WS_ERROR: {
      return {
        ...state,
        connectingError: action.payload
      };
    }
    default: {
      return state;
    }
  };
};
import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED
} from "../actions/order";

const initialState = {
  orderId: 0,
  orderRequest: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderId: action.payload,
        orderRequest: false,
        orderFailed: false
      };
    }
    case POST_ORDER_FAILED: {
      return {
      ...state,
      orderRequest: false,
      orderFailed: true,
      orderId: initialState.orderId
      };
    }
    default: {
      return state;
    }
  }
};
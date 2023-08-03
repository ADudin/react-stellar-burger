import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from "../actions/order";

const initialState = {
  orderId: 0,
  orderRequest: false,
  orderFailed: false,
  orderData: {}
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true};
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderId: action.payload,
        orderRequest: false,
        orderFailed: false
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderData: action.payload,
        orderRequest: false,
        orderFailed: false
      }
    }
    case POST_ORDER_FAILED: {
      return {
      ...state,
      orderRequest: false,
      orderFailed: true,
      orderId: initialState.orderId
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        orderData: initialState.orderData
      }
    }
    default: {
      return state;
    }
  }
};
import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TOrderActions
} from "../actions/order";

import { IOrder } from "../types/order-type";

export interface IOrderState {
  orderId: number;
  orderRequest: boolean;
  orderFailed: boolean;
  orderData: IOrder;
};

const initialState: IOrderState = {
  orderId: 0,
  orderRequest: false,
  orderFailed: false,
  orderData: {
    createdAt: '',
    ingredients: [],
    name: '',
    number: 0,
    owner: '',
    status: '',
    updatedAt: '',
    _id: '',
    __v: 0
  }
};

export const orderReducer = (state: IOrderState = initialState, action: TOrderActions) => {
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